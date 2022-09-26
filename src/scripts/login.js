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
      alert(request.response[0].password)
    };
  } catch(err){
    alert(err)
  }
}