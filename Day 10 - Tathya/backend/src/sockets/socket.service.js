const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const userModel = require("../models/auth.model");
const askAI = require("../services/ai.service");
const messageModel = require("../models/message.model");

const initSocketServer = (httpServer) => {
    const io = new Server(httpServer, {});

    /* ----------Socket.io Middleware---------- */
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

    })

    io.on("connection", (socket) => {

        socket.on("message", async (chat) => {
            await messageModel.create({
                user: socket.user._id,
                chat: chat.chatId,
                content: chat.question,
                role: "user"
            })

            const chatHistory = await messageModel.find({
                chat: chat.chatId
            })

            /* To apply the limit to the chats history. */
            // const chatHistory = (await messageModel.find({
            //     chat: chat.chatId
            // }).sort({ created: -1 }).limit(20).lean()).reverse()

            const answer = await askAI(chatHistory.map(item => {
                return {
                    role: item.role,
                    parts: [{ text: item.content }]
                }
            }))
            await messageModel.create({
                user: socket.user._id,
                chat: chat.chatId,
                content: answer,
                role: "model"
            })

            socket.emit("AI-answer", {
                chatId: chat.chatId,
                answer: answer
            });
        })
    });

}
module.exports = initSocketServer;