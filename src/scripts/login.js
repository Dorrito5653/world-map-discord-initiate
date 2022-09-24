async function getLogin(){
  console.log('------')
  let usernameElement = document.querySelector('#username')
  let passwordElement = document.querySelector('#password')
  const url = `http://localhost:3000/config/${usernameElement.value}`
  try {
    const request = new XMLHttpRequest()
    request.open("GET", url, true);
    let jsonResponse;
    request.send()
    request.onload = function(){
      jsonResponse = request.response
      alert(request.response)
    };
  } catch(err){
    alert(err)
  }
}