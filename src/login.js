
const { LoginSchemaModel } = require('./dbconfig.js')
// import { LoginSchemaModel } from './dbconfig'
requirejs()
function submitLoginInfo () {
    let usernameElement = document.querySelector('#username')
    let passwordElement = document.querySelector('#password')

    console.log(`Username Element is HTMLElement: ${usernameElement instanceof HTMLElement}`);
    console.log(`Username Element is HTMLElement: ${passwordElement instanceof HTMLElement}`);

    alert(`usernameElement = ${usernameElement}`);
    alert(`passwordElement = ${passwordElement}`);

    alert(`username = ${usernameElement.value}`);
    alert(`password = ${passwordElement.value}`);
  }