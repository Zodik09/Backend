const mongoose = require("mongoose");

const connectToDB = ()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("DB is connected to server.");
    })
    .catch(err=>{
        console.log("DB connection failed due to " + err);
    })
}

module.exports = connectToDB