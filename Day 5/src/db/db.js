const mongoose = require("mongoose");
require('@dotenvx/dotenvx').config()

const connectToDB = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('DB has been connected to server successfully.');
        })
}

module.exports = connectToDB;