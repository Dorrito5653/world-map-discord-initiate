async function getLogin(username, password){
  const request = new XMLHttpRequest()
  request.open("GET", `http://localhost:3000/config/${username}`);
  request.send();
  request.onload(console.log(request));
  return request.response;
}


async function submitLoginInfo () {
    let usernameElement = document.querySelector('#username')
    let passwordElement = document.querySelector('#password')

    // let response = await fetch(`http://localhost:3000/config/${usernameElement.value}`)
    // let data = await response.json()

    console.log(`Username Element is HTMLElement: ${usernameElement instanceof HTMLElement}`);
    console.log(`Username Element is HTMLElement: ${passwordElement instanceof HTMLElement}`);

    alert(`username = ${usernameElement.value}`);
    alert(`password = ${passwordElement.value}`);

    const login = await getLogin(usernameElement.value, passwordElement.value);
    alert(login)
    // alert('hello');
    // alert('str')
    // if (!data) return 'Cannot find user'
    // return data;
      // .then(console.log(usernameElement.value))
    


    // if (!request.response) alert(`No such login found`);
    // else return { src: '../start.html'};
  }
  