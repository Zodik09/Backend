const express = require("express");
const multer = require("multer");
const uploadFile = require("../services/storage.services");
const { default: mongoose } = require("mongoose");
const songsModel = require("../models/songs.model");
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/songs", upload.single("audio"), async (req, res) => {
    const { title, artist, mood } = req.body;
    const fileData = await uploadFile(req.file);
    const uploadSong = await songsModel.create({
        title: title,
        artist: artist,
        audio: fileData.url,
        mood: mood
    })

    res.status(201).json({
        message: "New Song Posted successfully."
    })
})
router.get("/songs", async (req, res) => {
    const { mood } = req.query;
    if (mood) {
        const songsList = await songsModel.find({
            mood: mood
        })

        if (songsList.length > 0) {
            res.status(200).json({
                message: mood + " songs.",
                songs: songsList
            })
        }
        else {
            res.status(200).json({
                message: mood + " songs don't exist."
            })
        }
    }
    else {
        res.status(200).json({
            message: 'Mood query is required.'
        })
    }
})

module.exports = router;