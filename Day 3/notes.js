const express = require('express');
const app = express();
const port = 3000;

let notes = [];

app.use(express.json())  //Middleware = It allows express to read the data coming from frontend in req.body👇🏻.

app.post('/notes', (req, res) => {
    notes.push(req.body)
    res.json({  //JSON format response sent to frontend.
        'message': "You have successfully added notes👍🏻.",
        "notes": notes
    })
    console.log(notes);
})

app.listen(port, () => {
    console.log('Server is running on port ' + port + '...');
})