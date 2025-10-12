const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auth",
    required: true,
  },
  image: String,
  caption: String,
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;