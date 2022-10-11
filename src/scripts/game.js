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
  websocket.onopen = () => { websocket.send('Bob'); }
};

function sidebar_open() {
  document.getElementById('sidebar').style.transform = "translate(0px)"
  document.getElementById('sidemenu-open').style.display = "none"
  document.getElementById('sidemenu-close').style.display = "block"
  console.log('---------')
}

function sidebar_close() {
  document.getElementById('sidebar').style.transform = "translate(-100px)"
  document.getElementById("sidemenu-close").style.display = "none"
  document.getElementById("sidemenu-open").style.display = "block"
}

function init() {
  var img_ele = null,
    x_cursor = 0,
    y_cursor = 0,
    x_img_ele = 0,
    y_img_ele = 0;

  function zoom(zoomincrement) {
    img_ele = document.getElementById('map');
    var pre_width = img_ele.getBoundingClientRect().width, pre_height = img_ele.getBoundingClientRect().height;
    img_ele.style.width = (pre_width * zoomincrement) + 'px';
    img_ele.style.height = (pre_height * zoomincrement) + 'px';
    img_ele = null;
  }

  document.getElementById('zoomout').addEventListener('click', function () {
    zoom(0.5);
  });
  document.getElementById('zoomin').addEventListener('click', function () {
    zoom(1.5);
  });

  function start_drag() {
    img_ele = this;
    x_img_ele = window.event.clientX - document.getElementById('map').offsetLeft;
    y_img_ele = window.event.clientY - document.getElementById('map').offsetTop;

  }

  function stop_drag() {
    img_ele = null;
  }

  function while_drag() {
    var x_cursor = window.event.clientX;
    var y_cursor = window.event.clientY;
    if (img_ele !== null) {
      img_ele.style.left = (x_cursor - x_img_ele) + 'px';
      img_ele.style.top = (window.event.clientY - y_img_ele) + 'px';

      console.log(img_ele.style.left + ' - ' + img_ele.style.top);

    }
  }

  document.getElementById('map').addEventListener('mousedown', start_drag);
  document.getElementById('container').addEventListener('mousemove', while_drag);
  document.getElementById('container').addEventListener('mouseup', stop_drag);
}

window.onload = init