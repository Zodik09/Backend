const express = require("express");
const authRoute = express.Router();
const {
  registerController,
  loginController,
  logoutController,
} = require("../controllers/auth.controller");

authRoute.post("/register", registerController);

authRoute.post("/login", loginController);

authRoute.get("/logout", logoutController);

module.exports = authRoute;
