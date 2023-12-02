const User = require('../models/User');

exports.getAllUsers = (req, res, next) => {
    User.find()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(500).json({ error }))
}