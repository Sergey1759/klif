const jwt = require('jsonwebtoken');
const config = require('config');
module.exports = (req,res, next) => {
    if(req.method == 'OPTIONS'){
        return next();
    }
    try{
        const token = req.body.token;
        if(!token){
            return res.status(401).json({message : "is not auth user"})
        }
        const decoded = jwt.verify(token,config.get('secret_jwt'));
        req.user = decoded;
        next()
    } catch (e) {
        return res.status(401).json({message : "is not auth user"})
    }
}