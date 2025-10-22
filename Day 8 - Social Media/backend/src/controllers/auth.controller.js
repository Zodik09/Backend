const authModel = require("../models/auth.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uploadImage = require("../services/storage.service");
const { v4: uuid } = require("uuid");

// Helper: set cookie safely
const setTokenCookie = (res, token) => {
  res.cookie("token", token, {
  httpOnly: false,   // must be false if JS needs to read it
  secure: false,     // true only in HTTPS
  sameSite: "lax",   // or "none" if frontend is on different domain
  maxAge: 1000 * 60 * 60 * 24,
  });
};

// ---------------- Register Controller ----------------
const registerController = async (req, res) => {
  try {
    const { name, email, username, password } = req.body || {};
    const profilePicture = req.file;

    // Basic validation
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
          "Invalid name! Length must be between 3 to 30 characters. Letters, numbers, spaces, or underscores allowed.",
      });
    }

    const usernameRegex = /^[A-Za-z0-9_]{3,20}$/;
    if (!usernameRegex.test(trimmedUsername)) {
      return res.status(422).json({
        message:
          "Invalid username! Length must be between 3 to 20 characters. Only letters, numbers, or underscores allowed.",
      });
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(422).json({
        message:
          "Password must contain at least 1 lowercase, 1 uppercase, 1 digit, and 1 special character.",
      });
    }

    // Check if email or username already exists
    const emailExist = await authModel.findOne({ email: trimmedEmail });
    const userExist = await authModel.findOne({ username: trimmedUsername });

    if (emailExist) {
      return res.status(409).json({
        message: "E-mail already registered. Please login.",
      });
    }
    if (userExist) {
      return res.status(409).json({
        message: "Username already taken. Choose a different one.",
      });
    }

    // Upload profile picture (if any)
    let profilePictureData = {};
    if (profilePicture) {
      profilePictureData = await uploadImage(profilePicture, uuid());
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await authModel.create({
      profilePicture: profilePictureData.url || "",
      name: trimmedName,
      email: trimmedEmail,
      username: trimmedUsername,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Set cookie
    setTokenCookie(res, token);

    // Respond
    return res.status(200).json({
      message: `${trimmedName} registered successfully!`,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        profilePicture: user.profilePicture,
      },
    });
  } catch (err) {
    console.error("Register error:", err);
    return res
      .status(500)
      .json({ message: "Server error during registration." });
  }
};

// ---------------- Login Controller ----------------
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password are required!" });
    }

    const user = await authModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not found!" });
    }

    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    setTokenCookie(res, token);

    return res.status(200).json({
      message: `${user.name} logged in successfully!`,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        profilePicture: user.profilePicture,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error during login." });
  }
};

// ---------------- Logout Controller ----------------
const logoutController = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  return res.status(200).json({ message: "Logged out successfully!" });
};

module.exports = { registerController, loginController, logoutController };
