const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    title: {type: String},
    artist: {type: String},
    album: {type: String},
    year: {type: Number}
})

module.exports = mongoose.model('Data', dataSchema)