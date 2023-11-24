const mongoose = require('mongoose');

const characterSchema = mongoose.Schema({
  nom: { type: String, required: true, unique: true },
  puissance: { type: Number, required: true },
  defense: { type: Number, required: true },
  HP: { type: Number, required: true },
  type: { type: String, required: true },
});

module.exports = mongoose.model('Character', characterSchema);