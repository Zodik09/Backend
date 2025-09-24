const express = require('express');
const app = express();  // Create Express Server.

const port = 3000;  //  Port Number for server to run.

app.use(express.json())  //  Middleware which allows express to read req.body's JSON format data.

let notes = [];  //  Notes array to store notes data.

//  GET api to get the notes data from the server.
app.get('/notes', (req, res) => {
    res.json(notes);
})

//  POST api to add new notes data in the server.
app.post('/notes', (req, res) => {
    notes.push(req.body)
    res.json({
        message: 'Added notes successfully.',
        // notes: notes
    });
})

//  PATCH api to update the existing notes data in the server.
app.patch('/notes/:index', (req, res) => {
    if (req.params.index > notes.length - 1) {
        res.json({
            message: (req.params.index) + ' index does not exist.',
            // notes: notes
        });
    }
    else {
        notes[req.params.index].title = req.body.title;
        res.json({
            message: 'Updated notes successfully.',
            // notes: notes
        });
    }

})

//  DELETE api to delete the existing notes data from the server.
app.delete('/notes/:index', (req, res) => {
    if (req.params.index > notes.length - 1) {
        res.json({
            message: (req.params.index) + ' index does not exist.',
            // notes: notes
        });
    }
    else {
        notes.splice(req.params.index, 1);
        res.json({
            message: (req.params.index) + ' index note has been deleted successfully.',
            // notes: notes
        });
    }
})

//  Started Express server on port 3000.
app.listen(port, () => {
    console.log('Server is running on port ' + port + "...")
})