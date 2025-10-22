const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth.route");
const postRoute = require("./routes/post.route");

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", // After production switch to the frontend production URL
    credentials: true,
  })
);

app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);

module.exports = app;
