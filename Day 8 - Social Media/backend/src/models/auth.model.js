const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  profilePicture: String,
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
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
