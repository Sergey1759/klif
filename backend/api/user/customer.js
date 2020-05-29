let connect = require('../../database');

let query = {};

query.getAll =  () => {
     return ConstructorQuery(`select * from customers`)();
};

query.getById =  (id) => {
    return ConstructorQuery(`select * from customers where id = '${id}'`)();
};
query.getByEmailAndPassword =  (email, password) => {
    return ConstructorQuery(`select * from customers where email = '${email}' AND password = '${password}';`)();
};

query.getByEmail =  (email) => {
    return ConstructorQuery(`select * from customers where email = '${email}'`)();
};

query.setCode =  (code, email) => {
    return ConstructorQuery(`UPDATE customers SET code = '${code}' where email = '${email}'`)();
};

query.insert =  (name,phone,password, email) => {
    return ConstructorQuery(`INSERT INTO customers (name,phone,password,email) VALUES('${name}','${phone}','${password}','${email}');`)();
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