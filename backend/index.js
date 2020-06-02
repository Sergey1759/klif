const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const database = require('./database');
const PORT = config.get('port') || 5000;

app.use('/user/', require('./routes/user'));

async function start(){
    database.connectDatabase();
    app.listen(PORT, () => { console.log(`server has been started in port ${PORT}`)});
}

start();
