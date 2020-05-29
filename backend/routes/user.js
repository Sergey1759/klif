const express = require('express');
const router = express.Router();
const middleware = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const mailer = require('../service/mailer');
const later = require('../laters/registration')
const api = require('../api/user/customer');
const crypto = require('crypto');
const jwt = require('../api/jwt/JsonWebToken');

router.post('/signup',[
    check('user_email').isEmail().normalizeEmail(),
    check('user_password').isLength({ min: 10 }),
    check('user_name').not().isEmpty().trim(),
    check('user_phone').not().isEmpty().trim()
], async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {
        let isEmpty = await api.query.getByEmail(req.body.user_email);
        if (isEmpty.length == 0){
            let {text, html, subject, code} = later;
            await api.query.insert(req.body.user_name,req.body.user_phone,hash(req.body.user_password),req.body.user_email);
            await api.query.setCode(code,req.body.user_email);
            mailer(req.body.user_email,subject,text,html);
            return res.status(200).json({ Ok: 'Регистрация пройшла успешно' });
        } else {
            return res.status(400).json({ errors: 'Это email уже существует' });
        }

    } catch (e) {
        return res.status(500).json({ errors: e });
    }

});

router.post('/login', [
    check('user_email').isEmail().normalizeEmail(),
    check('user_password').isLength({ min: 10 })
], async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    let user = await api.query.getByEmailAndPassword(req.body.user_email,hash(req.body.user_password));
    if(user.length === 1){
        let token = jwt.getToken(req.body.user_email);
        res.status(200).json({ status: 'All ok ', token: token});
    } else {
        res.status(500).json({ errors: 'не верный логин или пароль'});
    }
});


function hash(text) {
    return crypto.createHash('sha1')
        .update(text).digest('base64')
}

module.exports = router;