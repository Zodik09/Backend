const express = require("express");
const songsRouter = require("./routes/songs.routes");
const app = express();

app.use(express.json());
app.use("/", songsRouter)

module.exports = app;