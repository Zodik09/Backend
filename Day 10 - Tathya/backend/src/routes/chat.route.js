const express = require('express');
const chatRouter = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const chatController = require('../controllers/chat.controller');

chatRouter.post("/", authMiddleware, chatController)

module.exports = chatRouter;