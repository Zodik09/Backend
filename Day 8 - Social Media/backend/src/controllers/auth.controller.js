const authModel = require("../models/auth.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uploadImage = require("../services/storage.service");
const { v4: uuid } = require("uuid");

// Register Controller Starts here...
const registerController = async (req, res) => {
  const { name, email, username, password } = req.body || {};
  const profilePicture = req.file;
  console.log(profilePicture, name, email, username, password);

  if (!name || !email || !username || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim().toLowerCase();
  const trimmedUsername = username.trim().toLowerCase();

  if (!trimmedName || !trimmedEmail || !trimmedUsername || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const nameRegex = /^[A-Za-z0-9_ ]{3,30}$/;
  if (!nameRegex.test(trimmedName)) {
    return res.status(422).json({
      message:
        "Invalid name! Length must in between 3 to 20 characters. Only Letters, Numbers, or Underscores are allowed.",
    });
  }

  const usernameRegex = /^[A-Za-z0-9_]{3,20}$/;
  if (!usernameRegex.test(trimmedUsername)) {
    return res.status(422).json({
      message:
        "Invalid username! Length must in between 3 to 20 characters. Only Letters, Numbers, or Underscores are allowed.",
    });
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  if (!passwordRegex.test(password)) {
    return res.status(422).json({
      message:
        "Password must contain atleast 1 lowercase, 1 uppercase, 1 digit or 1 special character.",
    });
  }

  const emailExist = await authModel.findOne({
    email: trimmedEmail,
  });
  const userExist = await authModel.findOne({
    username: trimmedUsername,
  });

  if (emailExist) {
    return res.status(409).json({
      message: "E-mail registered already. Login instead.",
    });
  }
  if (userExist) {
    return res.status(409).json({
      message: "Username registered already. Choose different username.",
    });
  }

  const profilePictureData = await uploadImage(profilePicture, uuid());
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await authModel.create({
    profilePicture: profilePictureData.url,
    name: trimmedName,
    email: trimmedEmail,
    username: trimmedUsername,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token, {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  });

  return res
    .status(200)
    .json({ message: trimmedName + " added successfully." });
};

// Login Controller Starts here...
const loginController = async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email or Password field can not be empty!" });
  }

  const userExist = await authModel.findOne({
    email,
  });

  if (!userExist) {
    return res.status(404).json({ message: email + " not found!" });
  }

  const verifyPassword = await bcrypt.compare(password, userExist.password);

  if (!verifyPassword) {
    return res.status(400).json({
      message: "Invalid credentials!",
    });
  }

  const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET);

  res.cookie("token", token, {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  });

  return res
    .status(200)
    .json({ message: userExist.name + " logged in successfully!" });
};

// Logout Controller Starts here...
const logoutController = (req, res) => {
  res.clearCookie("token");

  res.status(200).json({
    message: "You have logged out successfully!",
  });
};

module.exports = { registerController, loginController, logoutController };
