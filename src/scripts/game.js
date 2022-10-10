function syncacc() {
  
}

function connect() {
  // server.py must be running for this to work
  const messages = document.createElement("ul");
  document.body.appendChild(messages);

  const websocket = new WebSocket("ws://localhost:5555/");
  websocket.onmessage = ({ data }) => {
    const message = document.createElement("li");
    const content = document.createTextNode(data);
    message.appendChild(content);
    messages.appendChild(message);
    console.log(data);
  };
  websocket.onopen = () => {websocket.send('Bob');}
};

function sidebar_open(){
  document.getElementById('sidebar').style.transform="translate(0px)"
  document.getElementById('sidemenu-open').style.display="none"
  document.getElementById('sidemenu-close').style.display="block"
  console.log('---------')
}

function sidebar_close(){
  document.getElementById('sidebar').style.transform="translate(-100px)"
  document.getElementById("sidemenu-close").style.display="none"
  document.getElementById("sidemenu-open").style.display="block"
}