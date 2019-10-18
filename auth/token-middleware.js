const jwt = require('jsonwebtoken');

module.exports = (user) => {

    const secret = 'is it secret?';

    const payload = {
        username: user.username,
        subject: user.id,
    };
    
    const options = {
        expiresIn: '1h'
    }

    return jwt.sign(payload, secret, options)
}