const uploadImage = require("../services/storage.service");
const postModel = require("../models/post.model");
const generateCaption = require("../services/ai.service");
const { v4: uuid } = require("uuid");

const createPostController = async (req, res) => {
  const image = req.file;
  const base64ImageFile = Buffer.from(image.buffer).toString("base64");

  // const caption = await generateCaption(base64ImageFile);
  // const imageData = await uploadImage(image, uuid());

  // 👆🏻 more optimised way to do both the async tasks parallely using Promise.all instead of doing one by one like 👇🏻.

  const [imageData, caption] = await Promise.all([
    uploadImage(image, uuid()),
    generateCaption(base64ImageFile),
  ]);

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
