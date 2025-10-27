const chatModel = require("../models/chat.model");

const chatController = async (req, res) => {
    console.log(req.body.title)
    const { title } = req.body;
    const user = req.user;

    if (!title) {
        return res.status(400).json({
            message: "Title is required!"
        })
    }

    const chat = await chatModel.create({
        user: user._id,
        title,
    })

    res.json({
        message: "Chat created successfully",
        chat
    })
}

module.exports = chatController;