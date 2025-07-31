const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadFile = require('../services/storage.service');
const songModel = require('../Models/song.model');

const upload = multer({storage: multer.memoryStorage()});
router.post('/songs',upload.single("audio") ,async (req, res) => {
    console.log(req.body);//Coment it when no need of it 
    console.log(req.file);//comment it out when it is not needed
    const fileData = await uploadFile(req.file);
    const song = await songModel.create({
        title: req.body.title,
        artist: req.body.artist,
        audio: fileData.url,
        mood: req.body.mood
    })
    res.status(201).send({
        message: 'Song created successfully',
        song: song
    })

})

// ek api jo backend se data ko frontend tak bheje
router.get('/songs',async (req, res) => {
    const {mood} = req.query;
    const Songs = await songModel.find({
        mood: mood
    });
    res.status(200).json({
        message: 'Songs fetched successfull',
        Songs: Songs
    })
})

module.exports = router;