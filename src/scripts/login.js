async function getLogin(){
  let usernameElement = document.querySelector('#username')
  let passwordElement = document.querySelector('#password')
  let newWindow = window.open(
    `http://localhost:3000/config/${usernameElement.value}`,
    '_blank'
  )
  
  const json = newWindow.document.getElementsByTagName('pre')[0].innerHTML
  refreshedwindow.alert(json)
  // newWindow.close()
  // try {
  //   const request = new XMLHttpRequest()
  //   request.open("GET", url, true);
  //   let jsonResponse;
  //   request.send()
  //   request.onload = function(){
  //     jsonResponse = request.response
  //     alert(request.response)
  //   };
  // } catch(err){
  //   alert(err)
  // }
}