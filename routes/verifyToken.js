const jwt = require('jsonwebtoken');

require('dotenv').config(process.cwd(), '../env')

// Check token is valid //
const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  console.log(token);
  
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });
    
  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err){
    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }

    // if everything good, save to request for use in other routes
    next();
  });
}

module.exports = verifyToken;