// Middleware for requests who require to be loged in

const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId,
           role: decodedToken.role
       };
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};