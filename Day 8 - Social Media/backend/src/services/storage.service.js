// storage.services.js
const ImageKit = require("imagekit");
const mongoose = require("mongoose");
require("@dotenvx/dotenvx").config();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

function uploadImage(file) {
  return new Promise((resolve, reject) => {
    imagekit.upload(
      {
        file: file.buffer,
        fileName: file.originalname + new mongoose.Types.ObjectId().toString(),
        folder: "images",
      },
      (error, result) => {
        error ? reject(error) : resolve(result);
      }
    );
  });
}
module.exports = uploadImage;
