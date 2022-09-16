async function submitLoginInfo () {
    let usernameElement = document.querySelector('#username')
    let passwordElement = document.querySelector('#password')

    console.log(`Username Element is HTMLElement: ${usernameElement instanceof HTMLElement}`);
    console.log(`Username Element is HTMLElement: ${passwordElement instanceof HTMLElement}`);

    alert(`usernameElement = ${usernameElement}`);
    alert(`passwordElement = ${passwordElement}`);

    alert(`username = ${usernameElement.value}`);
    alert(`password = ${passwordElement.value}`);

    const request = new XMLHttpRequest()
    request.open("GET", `localhost:3000/config/${usernameElement.value}`);
    request.send();
    console.log(request.response)

    if (!request.responseText) alert(`No such login found`);
    else return { src: '../start.html'};
  }