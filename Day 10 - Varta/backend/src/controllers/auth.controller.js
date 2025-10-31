const jwt = require("jsonwebtoken");
const authModel = require("../models/auth.model");
const bcrypt = require("bcryptjs");

const registerController = async (req, res) => {

    const { email, firstName, lastName, password } = req.body || {};

    if (!email || !firstName || !lastName || !password) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    const userExist = await authModel.findOne({ email })

    if (userExist) {
        return res.status(400).json({
            message: "User already exists!"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await authModel.create({
        email,
        fullName: { firstName, lastName },
        password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(201).json({ message: "User registered successfully!" });
}

const loginController = async (req, res) => {

    const { email, password } = req.body || {};

    if (!email || !password) return res.status(400).json({ message: "All fields are required!" });

    const userExist = await authModel.findOne({ email });
    if (!userExist) return res.status(404).json({ message: "User not found!" });

    const verifyPassword = await bcrypt.compare(password, userExist.password);
    if (!verifyPassword) return res.status(400).json({ message: "Invalid credentials!" });

    const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "User logged in successfully!" });
}
module.exports = { loginController, registerController };