const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/character');

router.get('/', userCtrl.getCharacters);
router.get('/:id', userCtrl.getCharacterById);

module.exports = router;