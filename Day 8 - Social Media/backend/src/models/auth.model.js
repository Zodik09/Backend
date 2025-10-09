const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
});

const authModel = mongoose.model("auth", authSchema);

module.exports = authModel;
// image: String,
// caption: String,
// likes: { type: Number, default: 0 },
// createdAt: { type: Date, default: Date.now }
