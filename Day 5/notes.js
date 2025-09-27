const express = require('express');
const app = express();  // Create Express server instance.
const noteModel = require("./src/models/notes.model")
const connectToDB = require('./src/db/db')  //  DB connection function required from the ./src/db/db.js file.

const port = 3000;  // Port number for server to run.

connectToDB();  //  DB is connected to Server.
// Middleware which allows Express to read req.body's JSON format data.
app.use(express.json());

// GET api to welcome users to the Notes App.
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to the notes app."
    });
});

// GET api to get the notes data from the server.
app.get("/notes", async (req, res) => {
    const noteData = await noteModel.find()

    if (noteData.length === 0) {
        res.json({
            message: "Your note is empty."
        });
    }
    res.json({
        message: "Your notes data.",
        noteData
    });
});

// POST api to add new notes data in the server.
app.post("/notes", async (req, res) => {
    const { title, desc } = req.body;

    // Validation check before inserting.
    if (!title || !desc) {
        return res.json({
            message: "Both 'title' and 'desc' are required."
        });
    }
    await noteModel.create({ title, desc })
    res.json({
        message: "Your note has been added successfully."
    });
});


// PATCH api to update the existing notes data in the server.
app.patch("/notes/:id", async (req, res) => {
    const { title, desc } = req.body;

    // Validation check before inserting.
    if (!title && !desc) {
        return res.json({
            message: "Both 'title' and 'desc' are required."
        });
    }

    const id = req.params.id
    await noteModel.findOneAndUpdate({
        _id: id
    }, {
        title: title,
        desc: desc
    })

    res.json({
        message: "Your note has been updated successfully."
    });
});


// DELETE api to delete the existing notes data from the server.
app.delete("/notes/:id", async (req, res) => {
    const id = req.params.id
    await noteModel.findOneAndDelete({ _id: id })
    res.json({
        message: `Note at id ${id} has been deleted successfully.`
    });
});

// Start Express server on given port.
app.listen(port, () => {
    console.log('Server is running on port ' + port + "...");
});
