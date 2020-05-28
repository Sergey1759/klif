var randomstring = require("randomstring");

function createLatter(code) {
    return {
        subject : 'love coding',
        text : 'babytransfer one love',
        html : `
        <h1> Успешная регистрация. Введите код - ${code} в  поле подтверждение по email</h1>
        `
    }
}

module.exports = createLatter(randomstring.generate());