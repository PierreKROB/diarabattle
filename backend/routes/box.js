const express = require('express');
const router = express.Router();
const boxCtrl = require('../controllers/box');

router.get('/:id', boxCtrl.getmyBox);

module.exports = router;