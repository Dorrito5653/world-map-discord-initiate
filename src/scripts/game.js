function syncacc() {

}

// The following functions were taken from: https://stackoverflow.com/a/30810322/19581763
function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  
  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(function() {
    console.log('Async: Copying to clipboard was successful!');
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
}

let spectateLink = null
let joinLink = null

function copySpectateLink() {
  if (spectateLink === null) {
    alert('You are not in a game right now! Click "To Battle" to start!')
  } else {
    copyTextToClipboard(spectateLink)
  }
}

function copyJoinLink() {
  if (joinLink === null) {
    alert('You are not in a game right now! Click "To Battle" to start!')
  } else {
    copyTextToClipboard(joinLink)
  }
}

function connect() {
  // server.py must be running for this to work
  const country = prompt('Choose a country to start as')

  const websocket = new WebSocket("ws://localhost:5555/");
  websocket.onmessage = (ev) => {
    data = JSON.parse(ev.data)
  };
  websocket.onopen = () => {
    const params = new URLSearchParams(window.location.search)

    if (params.has('join')) {
      var send = { country: country, type: "join", joinCode: params.get("join") }
    } else if (params.has('spectate')) {
      var send = { country: country, type: "spectate", spectateCode: params.get("spectate") }
    } else {
      var send = { country: country, type: "create" }
    }
    websocket.send(JSON.stringify(send))
  }
  websocket.onmessage = (ev) => {
    let data = JSON.parse(ev.data)

    if (data.type === 'error') {
      error(data.message)
    } else if (joinLink === null && spectateLink === null) {
      // Sucessful
      drawJoinSpecatateLink(data.join, data.spectate)
    }
  }
}

function error(message) {
  alert(`Unknown Error: ${message}`)
  location.reload()
}

function drawJoinSpecatateLink (joinId, spectateId) {
  joinLink = `${document.URL}?join=${joinId}`
  spectateLink = `${document.URL}?spectate=${spectateId}`

  let spectate = document.getElementById('spectate-link')
  let join = document.getElementById('join-link')
  
  spectate.style.display = 'inline'      
  join.style.display = 'inline'

  spectate.addEventListener('click', copySpectateLink)
  join.addEventListener('click', copyJoinLink)
}

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