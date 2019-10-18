/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  const secret = 'is it secret?';
  if (token) {
      jwt.verify(token, secret, (err, decodedToken) => {
          if(err) {
              res.status(401).json({ message: 'Invalid credentials'})

          } else {
              req.username = decodedToken.username
              next();
          }
      });
  } else {
    res.status(401).json({ you: 'shall not pass!' });
    //res.status(400).send('message');

  }
};
