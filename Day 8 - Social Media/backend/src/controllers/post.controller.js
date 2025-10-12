const uploadImage = require("../services/storage.services");
const AI = require("../services/ai.services");
const postModel = require("../models/post.model");

const createPostController = async (req, res) => {
  const image = req.file;
  const imageData = await uploadImage(image);
  const caption = await AI(imageData.url);
  const post = await postModel.create({
    user: req.user._id,
    image: imageData.url,
    caption: caption,
  });

  res
    .status(201)
    .json({ message: "Post created successfully", caption: caption });
};

const getPostController = async (req, res) => {
  const userData = await postModel.find({ user: req.user._id });
  res.status(200).json({ user: userData });
};

module.exports = { createPostController, getPostController };
