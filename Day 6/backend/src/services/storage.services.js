// storage.services.js
const ImageKit = require("imagekit");
require("@dotenvx/dotenvx").config();

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

function uploadFile(file) {
    return new Promise((resolve, reject) => {
        imagekit.upload({
            file: file.buffer,
            fileName: "AZUL"
        }, (error, result) => {
            if (error) reject(error)
            else resolve(result);
        })
    })
}
module.exports = uploadFile;