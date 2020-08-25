const mongoose = require('mongoose')

const animeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true

    },
    releaseDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    numberEpisodes: {
        type: Number
        required: true

    }
})

module.exports = mongoose.model('Anime', animeSchema)