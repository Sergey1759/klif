const User = require('../classes/user');
const jwt = require('../api/jwt/JsonWebToken');

async function authetication(req){
    try {
        const user = new User.User(req.query.name,req.query.lastname,req.query.password,req.query.email);
        await user.login();
        return true;
    } catch (e) {
        return {error : e}
    }
}

module.exports = {
    authetication
}

