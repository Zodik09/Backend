const express = require("express")
const authRoute = express.Router();
const authModel = require("../models/auth.model")
const jwt = require("jsonwebtoken");


authRoute.post("/register", async (req, res) => {
    const { username, password } = req.body;

    const user = await authModel.create({
        username, password
    })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.cookie("token", token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    });

    res.status(201).json({
        message: "User is created successfully!"
    })
})

authRoute.get("/profile", async (req, res) => {
    const { token } = req.cookies
    if (!token) {
        return res.status(401).json({
            message: "Unauthorised!"
        })
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const user = await authModel.findOne({
            id: decode._id
        }).select("-password  -__v")

        res.status(200).json({
            message: "Here is your profile!",
            user
        })
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorised - Invalid Token!"
        })
    }
})

authRoute.post("/login", async (req, res) => {
    const { username, password } = req.body

    const user = await authModel.findOne({ username })

    if (!user) {
        return res.status(404).json({
            message: "Username not found!"
        })
    }

    if (!(user.password === password)) {
        return res.status(401).json({
            message: "Invalid password!"
        })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.cookie("token", token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    });

    res.status(200).json({
        message: "You are logged in successfully!",
        user
    })
})

authRoute.get("/logout", (req, res) => {
    res.clearCookie("token");

    res.status(200).json({
        message: "You are logged out successfully!"
    })
})

module.exports = authRoute;