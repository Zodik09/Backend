const express = require("express");
const multer = require("multer");
const uploadFile = require("../services/storage.services");
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/songs", upload.single("audio"), async (req, res) => {
    console.log(req.body);
    // console.log(req.file);
    const fileData = await uploadFile(req.file);
    console.log(fileData);
    
    res.json({
        message: "New Song Posted successfully."
    })
})

module.exports = router;