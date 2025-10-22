const { log } = require("console");
const app = require("./src/app");
const { createServer } = require("http");
const { Server } = require("socket.io");
const askAI = require("./src/services/ai.service");

const server = createServer(app);
const io = new Server(server, {});

const chatHistory = [];

io.on("connection", (socket) => {
  console.log("Socket.io server is running...");

  socket.on("chat", async (chat) => {
    log("Message received: ", chat);

    chatHistory.push({
      role: "user",
      parts: [{ text: chat }],
    });

    const response = await askAI(chatHistory);
    log("AI Response: ", response);

    chatHistory.push({
      role: "model",
      parts: [{ text: response }],
    });

    socket.emit("response", response);
  });

  socket.on("disconnect", () => {
    log("Socket.io server disconnected...");
  });
});

server.listen(3000, () => {
  log("Server is running on port 3000...");
});
