// Middleware for requests who require to be admin

const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
       if (decodedToken.role == 'admin') {
        req.auth = {
            userId: decodedToken.userId,
            role: decodedToken.role
        };
       } else {
        return res.status(400).json({ message : 'Permission administrateur requise.' });
       }
	next();
   } catch(error) {
       res.status(500).json({ message : 'Erreur serveur (voir logs).' });
       console.log(error)
   }
};