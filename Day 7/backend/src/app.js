const express = require("express")
const app = express()
const authRoute = require("./routes/auth.route")
const cookieParser = require("cookie-parser")

app.use(express.json());
app.use(cookieParser());
app.use("/auth",authRoute);

module.exports = app;