const express = require('express');
const chatRouter = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const { chatController, fetchChats } = require('../controllers/chat.controller');

chatRouter.post("/", authMiddleware, chatController)
chatRouter.get("/", authMiddleware, fetchChats)

module.exports = chatRouter;