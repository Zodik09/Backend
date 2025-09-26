const mongoose = require("mongoose");

const connectToDB = () => {
    mongoose.connect('')
        .then(() => {
            console.log('DB has been connected to server successfully.');
        })
}

module.exports = connectToDB;