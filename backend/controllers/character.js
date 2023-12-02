const Character = require('../models/Character');

exports.getCharacters = (req, res, next) => {
  Character.find()
    .then(characters => res.status(200).json(characters))
    .catch(error => res.status(500).json({ error }))
};

exports.getCharacterById = (req, res, next) => {
  Character.findOne({ _id: req.url.replace('/', '') })
    .then(character => res.status(200).json(character))
    .catch(error => res.status(500).json({ error }))
}

exports.createCharacter = (req, res, next) => {

  try {
      if (req.body.nom == undefined || req.body.type == undefined) {
        return res.status(400).json({ message: 'Merci de renseigner les paramètres nécessaires.' });
      } else {
        nom = req.body.nom;
        type = req.body.type;
      }

      if (type != 'END' && type != 'PUI' && type != 'AGI' && type != 'TEC' && type != 'INT') {
        return res.status(400).json({
          message: 'Type invalide (END, PUI, TEC, INT, AGI)'
        });
      } else {
          const character = new Character({
            nom: req.body.nom,
            puissance: req.body.puissance,
            defense: req.body.defense,
            HP: req.body.HP,
            type: req.body.type
        })

      character.save()
        .then(() => res.status(201).json({
            message: 'Personnage crée'
        }))
        .catch(error => {
            res.status(400).json({ message: 'Erreur lors de l\'enregistrement du personnages dans la base de données. (voir logs)' })
            console.log(error)
        });
    }
  }
  catch (error) {
        res.status(500).json({ message : 'Erreur avec le serveur. (voir logs)' })
        console.log(error) // For unintended errors
  }
}