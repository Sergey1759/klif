var randomstring = require("randomstring");

function createLatter(code) {
    return {
        subject : 'love coding',
        text : 'babytransfer one love',
        html : `
        <h1> ДЛя замены пароля введите код - '${code}' в  поле подтверждение по email</h1>
        `,
        code: code
    }
}

module.exports = createLatter(randomstring.generate());