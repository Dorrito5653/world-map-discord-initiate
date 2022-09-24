async function getLogin(){
  console.log('------')
  let usernameElement = document.querySelector('#username')
  let passwordElement = document.querySelector('#password')
  const url = `http://localhost:3000/config/${usernameElement.value}`
  try {
    const request = new XMLHttpRequest()
    // request.responseType = "json";
    request.onreadystatechange = () => {
      if (request.readyState === 4){
        callback(request.response)
      }
    }
    request.open("GET", url, true);
    // let jsonResponse;
    // request.onload = function(){
    //   jsonResponse = request.response
    // };
    request.send()
    alert(request)
  } catch(err){
    alert(err)
  }
}