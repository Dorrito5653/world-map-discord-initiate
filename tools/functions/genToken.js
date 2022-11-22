const bcrypt = require("bcryptjs")
async function gentoken(){
    let upletters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowletters = 'abcdefghijklmnopqrstuvwxyz',
        numbers = '1234567890',
        symbols = '!@#$%^&*|_+<>?/.',
        length = ((Math.random() * 100).toFixed(0) % 8) + 18,
        token = '';
    
    for (let i = 0; i < length; i++){
        let type;
        let idx = (Math.random() * 100).toFixed(0) % 4
        switch (idx){
            case 0:
                type = upletters
                break;
            case 1:
                type = lowletters
                break;
            case 2:
                type = numbers
                break;
            case 3:
                type = symbols
                break;
            default:
                break;
        }
        let pos = (Math.random() * 100).toFixed(0) % type.length
        let val = type[pos]
        token+= val;
    }

    token = await bcrypt.hash(token, 10)
    return token
}

gentoken().then(data => console.log(data))

module.exports = gentoken