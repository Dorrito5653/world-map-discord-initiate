function onSuccess(googleUser){
  console.log('Logged in as:' + googleUser.getBasicProfile().getName());
}
function onFaliure(error){
    console.log(error)
}
function renderButton(){
  gapi.signin2.render('my-signin2', {
    'scope': 'profile email',
    'width': 240,
    'height': 50,
    'longtile': true,
    'theme': 'dark',
    'onsuccess': onSuccess,
    'onfailure': onFaliure
  });
}

async function getLogin(){
  let username = document.querySelector('#username').value;
  let password = document.querySelector('#password').value;
  if (username == '' || password == '') {
    alert('Error, no username/password given');
    return;
  }
  const url = `http://localhost:3000/config/${username}`
  const request = new XMLHttpRequest()
  request.open("GET", url, true);
  request.setRequestHeader('password', password)
  request.send()
  request.onload = function(){
      let jsonResponse = `${request.response}`;
      if (request.status == 403) {
        alert('Incorrect Password');
        return;
      }
      alert(jsonResponse)
      let parsedRes = JSON.parse(jsonResponse);
      let newWindow = window.open(`https://dorrito5653.github.io/world-map-discord-initiate/src/game.html`)
      newWindow.localStorage.setItem("sessionId", `${parsedRes[0].sessionId}`)
  }
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

  var data = new FormData();
  data.append('username', `${username.value}`)
  data.append('password', `${password.value}`)
  data.append('email', `${email.value}`)
  data.append('created_date', Date.now())
  data.append('updated_date', Date.now())
  // data.append('created_date')

  let postreq = new XMLHttpRequest()
  postreq.open("POST", url, true)
  postreq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  postreq.onload = function(){
    console.log(this.responseText)
  }
  postreq.send(data)
}