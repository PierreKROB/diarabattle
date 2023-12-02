const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/admin');

const authAdmin = require('../middleware/authAdmin');

router.get('/allUsers', authAdmin, userCtrl.getAllUsers);

module.exports = router;