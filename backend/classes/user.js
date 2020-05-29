const crypto = require('crypto');
const customer = require('../api/user/customer')
class User {
    constructor(name , lastname, password,email,phone,address,child,birthday,registration_date,id) {
        this.name = name;
        this.lastname = lastname || null;
        this.password = this.hash(password);
        this.api = customer;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.child = child;
        this.birthday = birthday? birthday: null;
        this.registration_date = registration_date? registration_date : new Date();
        this.id = id || 1;

    }
    get(){
        return this.api.query.getById(this.id);
    }
    login(){
        console.log(this.name)
        return this.api.query.insert(this.name,this.lastname,this.password,this.email);
    }
     hash(text) {
        return crypto.createHash('sha1')
            .update(text).digest('base64')
    }
}

console.log('s');


module.exports = {
    User
}