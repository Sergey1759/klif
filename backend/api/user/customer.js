let connect = require('../../database');

let query = {};

query.getAll =  () => {
     return ConstructorQuery(`select * from customers`)();
};

query.getById =  (id) => {
    return ConstructorQuery(`select * from customers where id = ${id}`)();
};

query.insert =  (name,lastname,password, email) => {
    return ConstructorQuery(`INSERT INTO customers (name,lastname,password,email) VALUES('${name}','${lastname}','${password}','${email}');`)();
};


function ConstructorQuery(query){
    return function () {
        return new Promise((resolve,reject) => {
            connect.connection.query(query,
                function(err, rows, fields) {
                    if(err){
                        return reject(err);
                    }
                    return resolve(rows);
                });
        })
    }
}
module.exports = {
    query
}