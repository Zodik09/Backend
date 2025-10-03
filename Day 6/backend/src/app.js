const express = require("express");
const app = express();
const songsRouter = require("./routes/songs.routes");
const cors = require("cors");

app.use(cors())
app.use(express.json());
app.use("/", songsRouter)

module.exports = app;