const uploadImage = require("../services/storage.services");
const AI = require("../services/ai.services");
const postModel = require("../models/post.model");

const postController = async (req, res) => {
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

module.exports = postController;
