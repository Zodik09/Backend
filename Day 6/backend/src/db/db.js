const mongoose = require("mongoose");

const connectToDB = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("DB is connected to server.")
        })
        .catch((err) => {
            console.error("DB connection failed " + err)
        })
}

module.exports = connectToDB;