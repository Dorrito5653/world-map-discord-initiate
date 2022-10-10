async function getLogin(){
  let username = document.querySelector('#username').value;
  let password = document.querySelector('#password').value;
  if (username == '' | password == '') {
    alert('Error, no username/password given');
    return;
  }
  const url = `http://localhost:3000/config/${username}`
  const request = new XMLHttpRequest()
  request.open("GET", url, true);
  request.send()
  let jsonResponse;
  let finalres;
  request.onload = function(){
    jsonResponse = `${request.response}`;
    let parsedResponse = JSON.parse(jsonResponse)
    finalres = parsedResponse; 
    if (parsedResponse[0].password != password){
      return alert("Incorrect username or password.")
    }
    alert(jsonResponse)
  }

  // const val = function(){define([
  //     "require",
  //     '../../node_modules/bcryptjs/dist/bcrypt.js'
  //   ], function(require) {
  //     alert('------')
  //     var bcrypt = require('../../node_modules/bcryptjs/dist/bcrypt')
  //     bcrypt.compare(password, finalres[0].password, function(err, res){
  //       if (err) console.error(err)
  //       alert(res)
  //       if (!res) {
  //         return alert("Wrong username or password")
  //       }
  //     })
  //   })
  // };
  // val()
 
  //window.open('https://dorrito5653.github.io/world-map-discord-initiate/src/game.html','_self').close()
}


function register(){
  const email = document.querySelector('#email')
  const username = document.querySelector('#username')
  const password = document.querySelector('#password')
  let url = `http://localhost:3000/config/${username.value}`

  let checkreq = new XMLHttpRequest()
  checkreq.open("GET", url, true)
  checkreq.send()
  checkreq.onload = function(){
    if (checkreq.response){
      return alert("That username already exists. Please pick a different one")
    }
  }
  const passRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  if (passRegex.test(password.value)){
    return alert("Invalid Password")
  }

  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (mailformat.test(username.value) == false){
    return alert("Invalid Email Address.")
  }

  var data = new FormData();
  data.append('username', `${username.value}`)
  data.append('password', `${password.value}`)
  data.append('email', `${email.value}`)
<<<<<<< HEAD
  data.append('created_date', Date.now())
  data.append('updated_date', Date.now())
=======
  // data.append('created_date')
>>>>>>> 6842403bfe3cf8c225c581253a0a6f86845414d9

  let postreq = new XMLHttpRequest()
  postreq.open("POST", url, true)
  postreq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  postreq.onload = function(){
    console.log(this.responseText)
  }
  postreq.send(data)
}