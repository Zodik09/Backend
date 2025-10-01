const express = require("express");
const app = express();
const songsRouter = require("./routes/songs.routes");

app.use(express.json());
app.use("/", songsRouter)

module.exports = app;