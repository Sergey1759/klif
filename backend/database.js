var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'sql7.freemysqlhosting.net',
    user     : 'sql7343172',
    password : 'NBJ8UApLk4'
});

connectDatabase = () => {
    connection.connect();
}

module.exports.connect = connectDatabase;