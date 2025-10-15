const express = require("express");
const authRoute = express.Router();

const {
  registerController,
  loginController,
  logoutController,
} = require("../controllers/auth.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

authRoute.post(
  "/register",
  upload.single("profilePicture"),
  registerController
);

authRoute.post("/login", loginController);

authRoute.get("/logout", logoutController);

module.exports = authRoute;
