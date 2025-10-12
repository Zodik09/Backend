const uploadImage = require("../services/storage.services");

const postController = async (req, res) => {
  const image = req.file;
  console.log(image);
  const imageData = await uploadImage(image);
  console.log(imageData);
};

module.exports = postController;
