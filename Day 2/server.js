const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Chanda Rani');
})

app.get('/love', (req, res) => {
    res.send('Chanda Rani Loves Adarsh');
})

app.listen(3000, (req, res) => {
    console.log("Server is running on port 3000...");
})