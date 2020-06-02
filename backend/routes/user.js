const express = require('express');
const router = express.Router();
const middleware = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const mailer = require('../service/mailer');
const later = require('../laters/registration')
const later2 = require('../laters/resetpassword')
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
            let user = await api.query.insert(req.body.user_name,req.body.user_phone,hash(req.body.user_password),req.body.user_email);
            await api.query.setCode(code,req.body.user_email);
            mailer(req.body.user_email,subject,text,html);
            return res.status(200).json({ Ok: 'Регистрация пройшла успешно' , insertId : user.insertId});
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
    console.log(req.body)
    console.log(user)
    if(user.length === 1){
        let token = jwt.getToken(req.body.user_email);
        res.status(200).json({ status: 'All ok ', token: token});
    } else {
        res.status(500).json({ errors: 'не верный логин или пароль'});
    }
});

router.post('/resetpassword', [
    check('user_email').isEmail().normalizeEmail(),
],  async function (req, res, next) {
    console.log('qwe')
    console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    let user = await api.query.getByEmail(req.body.user_email);
    // res.status(200).json({ ok: 'письмо отправленно на почту'});
    if(user.length === 1){
        try {
            let {text, html, subject, code} = later2;
            await api.query.setCode(code,req.body.user_email);
            await mailer(req.body.user_email,subject,text,html);
            res.status(200).json({ user: user[0].id});
        } catch (e) {
            res.status(500).json({ errors: e});
        }
    } else {
        res.status(500).json({ errors: 'не верная почта либо такого пользователя не существует'});
    }
});

router.post('/confirmpassword', [
    check('newPassword').isLength({ min: 10 })
], async function (req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    let user = await api.query.getById(req.body.userId);
    if(user.length === 1){
        try {
            if ( req.body.confirmCode == user[0].code){
                let password = hash(req.body.newPassword);
                await api.query.setPassword(req.body.userId,password);
                res.status(200).json({ Ok : "All ok"});
            } else {
                res.status(400).json({ errors: 'Не верный код'});
            }
        } catch (e) {
            res.status(500).json({ errors: e});
        }

    } else {
        res.status(500).json({ errors: 'не верная почта либо такого пользователя не существует'});
    }
});

router.post('/confirm', async function (req, res, next) {
    let user = await api.query.getById(req.body.insert_id);
    if(user.length == 1 && user[0].code == req.body.confirmCode){
        try {
            let m = await api.query.activate(req.body.insert_id);
            console.log(m)
            res.status(200).json({ Ok: "All OK!!!"});
        }catch (e) {
            console.log(e)
            res.status(500).json({ errors: e});
        }
    } else {
        res.status(400).json({ errors: "Не правильный код"});
    }
});

router.post('/qweqwe',middleware, async function (req, res, next) {
    console.log(true)
});

function hash(text) {
    return crypto.createHash('sha1')
        .update(text).digest('base64')
}

module.exports = router;