const jsonWebToken = require('jsonwebtoken');
const config = require('config');

function getToken(UserEmail){
    const token = jsonWebToken.sign(
        { userId : UserEmail},
        config.get('secret_jwt'),
        {expiresIn: '1h'}
    );
    return token;
}

module.exports = {
    getToken
}