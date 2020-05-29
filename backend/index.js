const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');

const app = express();

const ApiToken = require('./api/jwt/JsonWebToken');
const customer = require('./api/user/customer');
const database = require('./database');
const auth = require('./service/auth');
const user = require('./classes/user');
const user_route = require('./routes/user');
const mailer = require('./service/mailer');

const PORT = config.get('port') || 5000;

app.use('/user/', require('./routes/user'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

async function start(){
    database.connectDatabase();
    // let m = await customer.query.getAll()
    // console.log(m)
    // let k = await customer.query.insert('sergey', 'listskiy');
    // console.log(k)
    req = {};
    req.body = {};
    req.body.name = '----qweeqwe';
    req.body.lastname = 'qweeqwe123123';
    req.body.password = 'qweeqwe123123';
    req.body.email = 'qweeqwe123123';
    // mailer('lisichka1759@gmail.com');
    // let m = await auth.authetication(req);
    // console.log(m)
    // let res = await customer.query.insert('123',123123);
    // console.log(res);
    app.listen(PORT, () => { console.log(`server has been started in port ${PORT}`)});
}

start();
