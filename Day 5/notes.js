// Import Express framework.
const express = require('express');
const app = express();  // Create Express server instance.


const port = 3000;  // Port number for server to run.
let notes = [];     // Notes array to store notes data (temporary in-memory DB).
// Middleware which allows Express to read req.body's JSON format data.
app.use(express.json());


// GET api to welcome users to the Notes App.
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to the notes app."
    });
});


// GET api to get the notes data from the server.
app.get("/notes", (req, res) => {
    if (notes.length === 0) {
        res.json([]);   // Return empty array instead of message (consistent type).
    } else {
        res.json(notes);
    }
});

// POST api to add new notes data in the server.
app.post("/notes", (req, res) => {
    const { title, desc } = req.body;

    // Validation check before inserting.
    if (!title || !desc) {
        return res.json({
            message: "Both 'title' and 'desc' are required."
        });
    }

    notes.push({ title, desc });  // Push only required fields, avoid junk data.
    res.json({
        message: "Your note has been added successfully."
    });
});


// PATCH api to update the existing notes data in the server.
app.patch("/notes/:index", (req, res) => {
    const index = parseInt(req.params.index, 10);  //  We use 10 to avoid ambiguity and make sure parseInt always converts the string to a decimal integer safely.

    // Validate index.
    if (isNaN(index) || index < 0 || index >= notes.length) {
        return res.json({
            message: `Note at index ${req.params.index} does not exist.`
        });
    }

    // Flexible update: only update fields present in req.body.
    Object.assign(notes[index], req.body);

    res.json({
        message: "Your note has been updated successfully."
    });
});


// DELETE api to delete the existing notes data from the server.
app.delete("/notes/:index", (req, res) => {
    const index = parseInt(req.params.index, 10);

    // Validate index.
    if (isNaN(index) || index < 0 || index >= notes.length) {
        return res.json({
            message: `Note at index ${req.params.index} does not exist.`
        });
    }

    notes.splice(index, 1);  // Remove note at given index.
    res.json({
        message: `Note at index ${req.params.index} has been deleted successfully.`
    });
});


// Start Express server on given port.
app.listen(port, () => {
    console.log('Server is running on port ' + port + "...");
});
