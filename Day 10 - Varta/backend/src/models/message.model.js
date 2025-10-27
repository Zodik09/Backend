const mongoose = require("mongoose");

const messsageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        required: true
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
        required: true
    },
    content: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "model", "system"],
        default: "user"
    }
}, {
    timestamps: true
}
)

const messageModel = mongoose.model("Message", messsageSchema);
module.exports = messageModel;