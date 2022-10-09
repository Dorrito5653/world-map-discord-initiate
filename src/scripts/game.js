function connect() {
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
  document.getElementById('#menubutton').style.translate=""
}

function sidebar_close(){
  document.getElementById('#sidemenu-open').style.translate()
}