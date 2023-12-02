const box = require('../models/Box');

exports.getmyBox = (req, res, next) => {
    box.findOne(req.params.id)
      .then(box => res.status(200).json(box))
      .catch(error => res.status(500).json({ error }))
}

