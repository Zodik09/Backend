const mongoose = require("mongoose");

const connectToDB = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('DB has been connected to server successfully.');
        })
        .catch((err) => {
            console.error("DB connection failed: " + err)
        })
}

module.exports = connectToDB;