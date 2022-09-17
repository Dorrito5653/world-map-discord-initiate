function getLogin(){
  let usernameElement = document.querySelector('#username')
  let passwordElement = document.querySelector('#password')

  const request = new XMLHttpRequest()
  request.responseType = "json";
  const url = `http://localhost:3000/config/${usernameElement.value}`
  request.open("GET", url, true);
  let jsonResponse;
  request.onload(
    function(){
      jsonResponse = request.response;
    }
  );
  return {jsonResponse, passwordElement};
}


function validateLogin (json, password) {
  const username = json.username;
  const actualpassword = json.password;
  if (password == actualpassword) return true
  else return false;
}
  