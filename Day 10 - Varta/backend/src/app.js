const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.route");
const chatRouter = require("./routes/chat.route");

app.use(express.json());
app.use(cookieParser())
app.use('/api/auth', authRouter);
app.use('/api/chat', chatRouter);



module.exports = app;
