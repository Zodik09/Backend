const express = require('express');
const app = express();
const authRoute = require('./routes/auth.route');

app.use(express.json({
  strict: true,
  type: "application/json"
}));

app.use('/auth', authRoute);

module.exports = app;