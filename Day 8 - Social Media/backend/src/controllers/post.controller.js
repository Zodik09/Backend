const uploadImage = require("../services/storage.service");
const postModel = require("../models/post.model");
const generateCaption = require("../services/ai.service");

const createPostController = async (req, res) => {
  const image = req.file;
  const base64ImageFile = Buffer.from(image.buffer).toString("base64");
  const caption = await generateCaption(base64ImageFile);
  const imageData = await uploadImage(image);
  const post = await postModel.create({
    user: req.user._id,
    image: imageData.url,
    caption: caption,
  });

  res.status(201).json({ imageURL: post.image, caption: post.caption });
};

const getPostController = async (req, res) => {
  const userData = await postModel.find({ user: req.user._id });
  res.status(200).json({ user: userData });
};

module.exports = { createPostController, getPostController };
