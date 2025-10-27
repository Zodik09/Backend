const mongoose = require("mongoose");

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB is connected to server...");
    } catch (err) {
        console.error("DB connection failed: " + err);
    }
};

module.exports = connectToDB;
