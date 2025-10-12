const authModel = require("../models/auth.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and Password are required!" });
  }

  const trimmedUsername = username.trim().toLowerCase();
  const trimmedPassword = password.trim();

  if (!trimmedUsername || !trimmedPassword) {
    return res
      .status(400)
      .json({ message: "Username or Password cannot be empty!" });
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

  if (!passwordRegex.test(trimmedPassword)) {
    return res.status(422).json({
      message:
        "Password must contain atleast 1 lowercase, 1 uppercase, 1 digit or 1 special character.",
    });
  }

  const userExist = await authModel.findOne({
    username: trimmedUsername,
  });

  if (userExist) {
    return res.status(409).json({
      message: "Username already exists. Please choose a different username.",
    });
  }
  const hashedPassword = await bcrypt.hash(trimmedPassword, 10);

  const user = await authModel.create({
    username: trimmedUsername,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token, {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  });

  return res
    .status(200)
    .json({ message: trimmedUsername + " added successfully." });
};

const loginController = async (req, res) => {
  const { username, password } = req.body || {};
  const trimmedUsername = username.trim().toLowerCase();
  const trimmedPassword = password.trim();
  if (!trimmedUsername || !trimmedPassword) {
    return res
      .status(400)
      .json({ message: "Username or Password cannot be empty!" });
  }

  const userExist = await authModel.findOne({
    username: trimmedUsername,
  });

  if (!userExist) {
    return res.status(404).json({ message: trimmedUsername + " not found!" });
  }

  const varifyPassword = await bcrypt.compare(password, userExist.password);

  if (!varifyPassword) {
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
    .json({ message: trimmedUsername + " logged in successfully!" });
};

const logoutController = (req, res) => {
  res.clearCookie("token");

  res.status(200).json({
    message: "You have logged out successfully!",
  });
};

module.exports = { registerController, loginController, logoutController };