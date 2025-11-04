const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const userModel = require("../models/auth.model");
const { askAI, generateVector } = require("../services/ai.service");
const messageModel = require("../models/message.model");
const { createMemory, queryMemory } = require("../services/vector.service");

const initSocketServer = (httpServer) => {
    /* Create new Socket.io server */
    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:5173",
            // methods: ["GET", "POST"],
            credentials: true,
        }
    });

    /* Socket.io Middleware for token authentication before establishing connection. */
    io.use(async (socket, next) => {
        const cookies = cookie.parse(socket.handshake.headers?.cookie || "");
        if (!cookies.token) {
            next(new Error("Authentication error: No token found!"));
        }
        try {
            const verify = jwt.verify(cookies.token, process.env.JWT_SECRET);
            const user = await userModel.findById(verify.id);
            socket.user = user;

            next();
        } catch (error) {
            next(new Error("Authentication error: Invalid token!"));
        }
    });

    io.on("connection", (socket) => {
        /* Socket event handler for User's question
         * Listens for: 'message' event
         * Expected payload: { chatId: string, question: string }
         */
        socket.on("message", async (payload) => {

            // Storing user asked question on DB.
            // Generating question's vector using Gemini Embeddings.
            const [questionData, questionVectors] = await Promise.all([
                messageModel.create({
                    user: socket.user._id,
                    chat: payload.chatId,
                    content: payload.question,
                    role: "user"
                }),
                generateVector(payload.question),
            ])

            /*
            // Storing user asked question on DB.
            const questionData = await messageModel.create({
                user: socket.user._id,
                chat: payload.chatId,
                content: payload.question,
                role: "user",
            });

            // Generating question's vector using Gemini Embeddings.
            const questionVectors = await generateVector(payload.question);
            */

            /* Storing user's questionVectors on the pincone's vector DB. */
            await createMemory({
                vectors: questionVectors,
                messageId: questionData._id,
                metadata: {
                    chatId: payload.chatId,
                    userId: socket.user._id,
                    text: payload.question
                },
            });

            // Retrieving previous chats for LTM (Long Term Memory).
            // Retrieving previous chats for STM (Short Term Memory).
            const [vectorHistory, chatHistory] = await Promise.all([
                queryMemory({
                    queryVector: questionVectors,
                    limit: 5,
                    metadata: {
                        user: socket.user._id
                    }
                }),
                messageModel.find({
                    chat: payload.chatId
                }).sort({ createdAt: -1 }).limit(20).lean().then(messages => messages.reverse())
            ])

            /*
            const vectorHistory = await queryMemory({
                queryVector: questionVectors,
                limit: 5,
                metadata: {
                    user: socket.user._id
                }
            })

            // To apply the limit to the chats history.
            const chatHistory = (await messageModel.find({
                chat: payload.chatId
            }).sort({ created: -1 }).limit(20).lean()).reverse()
    
            // Retrieving previous chats for STM (Short Term Memory).
            // const chatHistory = await messageModel.find({
            //     chat: payload.chatId,
            // });
            */

            /* Short Term Memory stored in JSON on MongoDB. */
            const stm = chatHistory.map((item) => {
                return {
                    role: item.role,
                    parts: [{ text: item.content }],
                };
            })

            /* Long Term Memory stored in VectorDB on Pinecone. */
            const ltm = [
                {
                    role: "user",
                    parts: [
                        {
                            text: `There are the messages from the previous chats, use them to generate a response: ${vectorHistory.map(item => item.metadata.text).join('\n')}`
                        }
                    ]
                }
            ]

            /* Asking the user's question from AI alongwith passing the previously asked LTM and STM */
            const answer = await askAI([...ltm, ...stm]);


            /* Socket event handler for AI's answer
             * Emits: 'AI-answer' event with { chatId: string, answer: string }
             */
            socket.emit("AI-answer", {
                chatId: payload.chatId,
                answer: answer,
            });

            // Storing AI replied answer on DB. 
            // Generating answer's vector using Gemini Embeddings.
            const [answerData, answerVectors] = await Promise.all([
                messageModel.create({
                    user: socket.user._id,
                    chat: payload.chatId,
                    content: answer,
                    role: "model",
                }),
                generateVector(answer),
            ])

            /*
            // Storing AI replied answer on DB.
            const answerData = await messageModel.create({
                user: socket.user._id,
                chat: payload.chatId,
                content: answer,
                role: "model",
            });

            // Generating answer's vector using Gemini Embeddings.
            const answerVectors = await generateVector(answer);
            */

            /* Storing AI's answerVectors on the pincone's vector DB. */
            await createMemory({
                vectors: answerVectors,
                messageId: answerData._id,
                metadata: {
                    chatId: payload.chatId,
                    userId: socket.user._id,
                    text: answer
                },
            });
        });
    });
};

module.exports = initSocketServer;