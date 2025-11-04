const chatModel = require("../models/chat.model");

const chatController = async (req, res) => {
    const { title } = req.body;
    const user = req.user;

    console.log("Title: " + title);


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
const fetchChats = async (req, res) => {
    const user = req.user;

    if (!user) {
        return res.status(404).json({
            message: "User not found! Try login again!"
        })
    }

    const fetchedChats = await chatModel.find({
        user
    })
    // console.log(fetchedChats)

    res.json({
        message: "Chat fetched successfully",
        fetchedChats
    })
}

module.exports = {
    chatController,
    fetchChats
};