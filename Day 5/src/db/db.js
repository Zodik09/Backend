const mongoose = require("mongoose");

const connectToDB = () => {
    mongoose.connect('mongodb+srv://zodik:tuRL7sg0JQlqCaBq@cluster.51yornv.mongodb.net/zodik')
        .then(() => {
            console.log('DB has been connected to server successfully.');
        })
}

module.exports = connectToDB;