const mongoose = require("mongoose");

const songsSchema = new mongoose.Schema({
    title: String,
    artist: String,
    audio: String,
    mood: String
})

const songsModel = mongoose.model("Moody Player", songsSchema);

module.exports = songsModel;