const express = require('express');
const router = express.Router();
const middleware = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const auth = require('../service/auth');
const mailer = require('../service/mailer');
const later = require('../laters/registration')
router.post('/signup', [
    check('email').isEmail().normalizeEmail(),
    check('password').isLength({ min: 10 }),
    check('name').not().isEmpty().trim(),
    check('lastname').not().isEmpty().trim()
], async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    let isAuth = await auth.authetication(req)
    if(isAuth === true){
         let {subject ,text, html} = later;
         mailer(req.query.email,subject,text,html);
         res.status(200).json({ status: 'All ok '});
    } else {
         res.status(500).json({ errors: isAuth.error });
    }
});

router.post('/login', [
    check('email').isEmail().normalizeEmail(),
    check('password').isLength({ min: 10 }),
    check('name').not().isEmpty().trim(),
    check('lastname').not().isEmpty().trim()
], async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    let isAuth = await auth.authetication(req)
    if(isAuth === true){
        res.status(200).json({ status: 'All ok '});
    } else {
        res.status(500).json({ errors: isAuth.error });
    }
});


module.exports = router;