const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const boxCtrl = require('../controllers/box');

router.get('/:id', auth, boxCtrl.getmyBox);

module.exports = router;