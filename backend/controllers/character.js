const Character = require('../models/Character');

exports.getCharacters = (req, res, next) => {
    Character.find()
       .then(characters => res.status(200).json(characters))
       .catch(error => res.status(500).json({ error }))
};

exports.getCharacterById = (req, res, next) => {
    Character.findOne({ _id: req.url.replace('/','') })
      .then(character => res.status(200).json(character))
      .catch(error => res.status(500).json({ error }))
}