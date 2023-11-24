const mongoose = require('mongoose');

const box = Object({
    id_Character: { type: Number, required: true, unique: true },
    id_Box: { type: Number, required: true, unique: true },
    niveau: { type: Number, required: true },
    doublon: { type: Number, required: true }
})

const boxSchema = mongoose.Schema({
    id_User: { type: Number, required: true, unique: true },
    box: [box],
})

module.exports = mongoose.model('Box', boxSchema);