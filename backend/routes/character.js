const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const userCtrl = require('../controllers/character');

router.get('/', auth, userCtrl.getCharacters);
router.get('/:id', auth, userCtrl.getCharacterById);
router.post('/createCharacter', auth, userCtrl.createCharacter);

module.exports = router;