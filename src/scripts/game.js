var px_size = 30,
  canvas = null,
  ctx = null,
  tiles = [
    ['city', 'desert', 'city', 'desert', 'city', 'desert', 'city', 'desert'],
    ['desert', 'city', 'desert', 'city', 'desert', 'city', 'desert', 'city'],
    ['city', 'desert', 'city', 'desert', 'city', 'desert', 'city', 'desert'],
    ['desert', 'city', 'desert', 'city', 'desert', 'city', 'desert', 'city'],
    ['city', 'desert', 'city', 'desert', 'city', 'desert', 'city', 'desert'],
  ],
  canvasOffsetX = 0,
  canvasOffsetY = 0,
  mouseStartX = null,
  mouseStartY = null,
  scrolling = false,
  spectateLink = null,
  joinLink = null,
  lastScrollTop = 0;

const textures = {
  city: new Image(),
  desert: new Image(),
  forest: new Image(),
  grassland: new Image(),
  jungle: new Image(),
  mountain: new Image(),
  snow: new Image(),
  water: new Image()
}

for (const key in textures) {
  if (Object.hasOwnProperty.call(textures, key)) {
    const img = textures[key];
    img.src = `../tools/images/tiles/${key}.jpg`
  }
}

function syncacc() {

}

function wMenu(type){
  switch (type) {
    case 'none': 
      break;
    
    case 'tanks':
      alert('tonk')

    default: 
      break;
  }
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
  navigator.clipboard.writeText(text).then(function () {
    console.log('Async: Copying to clipboard was successful!');
  }, function (err) {
    console.error('Async: Could not copy text: ', err);
  });
}

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

function drawJoinSpecatateLink(joinId, spectateId) {
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

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function draw() {
  clear()
  for (var y = 0; y < tiles.length; y++) {
    row = tiles[y]
    for (var x = 0; x < row.length; x++) {
      ctx.drawImage(textures[row[x]], canvasOffsetX + x * px_size, canvasOffsetY + y * px_size, px_size, px_size)
    }
  }
}

function zoom(zoomincrement) {
  px_size = Math.round(px_size * zoomincrement)
  draw()
}

function init() {
  canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d')
  draw()

  // Zoom in and zoom out buttons
  document.getElementById('zoomout').addEventListener('click', function () {
    zoom(0.5);
  });
  document.getElementById('zoomin').addEventListener('click', function () {
    zoom(2);
  });

  // Paning the image
  canvas.addEventListener('mousedown', (ev) => {
    mouseStartX = ev.x
    mouseStartY = ev.y
  })
  canvas.addEventListener('mousemove', (ev) => {
    if (mouseStartX !== null && mouseStartY !== null) {
      canvasOffsetX = (ev.x - mouseStartX) / 5
      canvasOffsetY = (ev.y - mouseStartY) / 5
      draw()
    }
  })
  canvas.addEventListener('mouseup', (ev) => {
    mouseStartX = null
    mouseStartY = null
  })

  document.addEventListener('wheel', (ev) => {
    if (ev.wheelDelta) {
      var scrollingUp = ev.wheelDelta > 0;
    } else {
      var scrollingUp = ev.deltaY < 0;
    }
    if (scrollingUp) { zoom(1.25) }
    else { zoom(0.75) }
  })
  draw()
}

window.onload = init
