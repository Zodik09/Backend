const express = require("express");
const postRoute = express.Router();
const multer = require("multer");
const {
  createPostController,
  getPostController,
} = require("../controllers/post.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const upload = multer({ storage: multer.memoryStorage() });
postRoute.post(
  "/",
  upload.single("image"),
  authMiddleware,
  createPostController
);
postRoute.get("/", authMiddleware, getPostController);

module.exports = postRoute;
