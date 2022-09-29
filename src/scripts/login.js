async function getLogin(){
  let usernameElement = document.querySelector('#username')
  let passwordElement = document.querySelector('#password')
  // window.open(
  //   `https://dorrito5653.github.io/world-map-discord-initiate/src/index.html`,
  //   '_blank'
  // )
  // console.log('------')
  if (usernameElement.value == '' | passwordElement.value == '') {
    alert('Error, no username/password given');
    return;
  }
  const url = `http://localhost:3000/config/${usernameElement.value}`
  try {
    const request = new XMLHttpRequest()
    request.open("GET", url, true);
    let jsonResponse;
    request.send()
    request.onload = function(){
      jsonResponse = request.response
      let val = JSON.parse(jsonResponse)
      if (val[0].password != passwordElement.value) return alert("Wrong username or password")
      alert(jsonResponse)
      window.open('https://dorrito5653.github.io/world-map-discord-initiate/src/game.html','_self').close()
      // let newwindow = window.open('https://dorrito5653.github.io/world-map-discord-initiate/src/game.html', "_blank")
    };
  } catch(err){
    alert(err)
  }
}

function register(){
  const email = document.getElementById('#email')
  const username = document.getElementById('#username')
  const password = document.getElementById('#password')
  let url = `http://localhost:3000/config/${username.value}`

  let checkreq = new XMLHttpRequest()
  checkreq.open("GET", url, true)
  checkreq.send()
  checkreq.onload = function(){
    if (checkreq.response){
      return alert("That username already exists. Please pick a different one")
    }
  }

  if (password.value.length < 8 || password.value.length > 60) return alert("Length of password cannot be less than 8 characters or more than 60 characters.")
  if (password.value){

  }
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!email.value.match(regex)){
    return alert("Invalid Email")
  }

  var data = new FormData();
  data.append('username', `${username.value}`)
  data.append('password', `${password.value}`)
  data.append('email', `${email.value}`)
  data.append('created_date')

  let postreq = new XMLHttpRequest()
  postreq.open("POST", url, true)
  postreq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  postreq.onload = function(){

  }
}