const express = require('express');
const authRouter = express.Router();
const { registerController, loginController, tokenVerify, logout } = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

authRouter.post("/register", registerController)
authRouter.post("/login", loginController)
authRouter.get("/logout", logout)
authRouter.get("/verify", authMiddleware, tokenVerify)

module.exports = authRouter;