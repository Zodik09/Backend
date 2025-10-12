// storage.services.js
const ImageKit = require("imagekit");
const mongoose = require("mongoose");
require("@dotenvx/dotenvx").config();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

function uploadImage(file, fileName) {
  return new Promise((resolve, reject) => {
    imagekit.upload(
      {
        file: file.buffer,
        fileName: fileName,
        folder: "images",
      },
      (error, result) => {
        error ? reject(error) : resolve(result);
      }
    );
  });
}
module.exports = uploadImage;
