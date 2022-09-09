const { LoginSchemaModel } = require('./dbconfig')
async function login(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    console.log(username)
    console.log(password)
    const log = await LoginSchemaModel.find({ username: username, password: password})
    console.log('--------')
    if (!log) return document.writeln('could not find that login, please try again')
}