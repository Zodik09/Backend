const express = require("express");
const postRoute = express.Router();
const multer = require("multer");
const postController = require("../controllers/post.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const upload = multer({ storage: multer.memoryStorage() });
postRoute.post("/", upload.single("image"), authMiddleware, postController);

module.exports = postRoute;