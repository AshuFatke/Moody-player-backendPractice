const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({

    title:String,
    artist:String,
    audio:String,
    mood:String,
});


const Song = mongoose.model('moodies', songSchema);

module.exports = Song;