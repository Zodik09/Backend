const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.route");
const chatRouter = require("./routes/chat.route");
const cors = require("cors")

app.use(express.json());
app.use(cookieParser())
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }
))
app.use('/api/auth', authRouter);
app.use('/api/chat', chatRouter);



module.exports = app;
