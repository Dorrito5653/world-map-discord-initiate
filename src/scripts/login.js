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
      newWindow.localStorage.setItem("token", `${parsedRes[0].token}`)
  }
}

function register(){
  const email = document.querySelector('#email').value
  const username = document.querySelector('#username').value
  const password = document.querySelector('#password').value
  let url = `http://localhost:3000/config`

  let data = new FormData()
  data.append("username", username)
  data.append("password", password),
  data.append("email", email)
  data.append("created_date", Date.now())
  data.append("updated_date", Date.now())

  let postreq = new XMLHttpRequest()
  postreq.open("POST", url, true)
  postreq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  postreq.onload = function(){
    if (postreq.status == 409) {
      alert("Error Code 409, username already exists")
      return
    } else if (postreq.status == 400) {
      alert("There was an error creating your account.")
      return;
    }
    alert("Successfully created account")
  }
  postreq.send(data)
}