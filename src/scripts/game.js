class Tile {
  constructor(xpos, ypos, terrain, tilenum, items) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.terrain = terrain;
    this.tilenum = tilenum;
    this.items = items;
  }
}

var px_size = 30,
  canvas = null,
  ctx = null,
  map = null,
  canvasOffsetX = 0,
  canvasOffsetY = 0,
  mousePressed = false,
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

async function generateTiles() {
  
  var tileLength = 8,
      tileWidth = 5,
      arrayOfTiles = [],
      numOfTiles = 40;

  for (let i = 0; i < tileWidth; i++) {
    arrayOfTiles[i] = [];
  }

  let tilenum = 0;
  for (let g = 0; g < tileWidth; g++) {
    for (let i = 0; i < tileLength; i++) {
      let tile = new Tile(i, g, null, tilenum, null)
      let waterbool = (Math.random() * 100).toFixed(0) % 3;
      if (waterbool == 0) waterbool = true
      else if (waterbool == 1) waterbool = false;
      else waterbool = false;
      if (waterbool == true) {
        tile.terrain = "water"
      } else {
        tile.terrain = "flatland"
      }
      tilenum++
    }
  }

  for (let i = 0; i < tileLength; i++) {
    let tile = new Tile(i, 0, null, i, [])
    let waterbool = (Math.random() * 100).toFixed(0)
    if (waterbool == 0) waterbool = false;
    else waterbool = true;
    if (waterbool == true) {
      tile.terrain = "water"
    } else {
      if (!arrayOfTiles[0][i - 1]) return;
      if (!arrayOfTiles[0][i + 1]) return;
      let leftTileProperty = arrayOfTiles[0][i - 1].Tile.terrain,
        rightTileProperty = arrayOfTiles[0][i + 1].Tile.terrain;

      if (leftTileProperty == 'water' && rightTileProperty == 'water') tile.terrain = "water";
      if (leftTileProperty == 'water' && rightTileProperty !== "water" || rightTileProperty == "water" && leftTileProperty !== "water") {
        let newWaterBool = (Math.random() * 100).toFixed(0);
        if (newWaterBool == 0) {
          newWaterBool = true;
          tile.terrain = "water"
        }
        else newWaterBool = false;
      }
      if (tile.terrain == "water") return;

    }

    arrayOfTiles[0][i] = tile;
  }
}

function tilesAround(array) {
  let arrayOfTiles = {
    left: Tile,
    right: Tile,
    top: Tile,
    bottom: Tile,
    topleft: Tile,
    topright: Tile,
    bottomleft: Tile,
    bottomright: Tile
  }

  arrayOfTiles.left
  return arrayOfTiles;
}

function syncacc() {

}

function wMenu(type) {
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
    } else if (data.type === 'start') {
      // initial data
      drawJoinSpecatateLink(data.join, data.spectate)
      map = data.map
      gameInit()
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
  let div = document.querySelector('.copy-link')

  spectate.style.display = 'inline'
  join.style.display = 'inline'
  div.style.display = 'unset'

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

function isSquareVisible(x, y) {
  let xPos = canvasOffsetX + x * px_size,
      yPos = canvasOffsetY + y * px_size,
      visible = true
  const corners = {
    topLeft: [xPos, yPos],
    topRight: [xPos + px_size, yPos],
    bottomLeft: [xPos, yPos + px_size],
    bottomRight: [xPos + px_size, yPos + px_size]
  }
  for (const key in corners) {
    if (Object.hasOwnProperty.call(corners, key)) {
      const coors = corners[key];
      const xCoor = coors[0],
            yCoor = coors[1]
      if (
        xCoor > canvas.width || xCoor < 0 ||
        yCoor > canvas.height || yCoor < 0
      ) { visible = false }
      else { return true }
    }
  }
  return visible
}

function draw() {
  clear()
  var tiles = map.tiles
  for (var y = 0; y < tiles.length; y++) {
    row = tiles[y]
    for (var x = 0; x < row.length; x++) {
      if (isSquareVisible(x, y)) {
        ctx.drawImage(textures[row[x]], canvasOffsetX + x * px_size, canvasOffsetY + y * px_size, px_size, px_size)
      }
    }
  }
}

function zoom(zoomincrement) {
  px_size = Math.round(px_size * zoomincrement)
  draw()
}

function showNotLoggedIn() {
  alert('not logged in yet')
  document.getElementById('loginFalse').style.display = "block"
}

function showDateTime() {
  let dt = new Date();
  let hours = dt.getHours() > 12 ? dt.getHours() - 12 : dt.getHours()
  let minutes = dt.getMinutes() < 10 ? "0" + dt.getMinutes() : dt.getMinutes()
  const ampm = dt.getHours() < 12 ? "AM" : "PM"
  let time = `${hours} ` + `${minutes}${ampm}`

  document.getElementById('date-time').innerHTML = time;
  setTimeout(showDateTime, 1000)
}

function resourcesInit(sessionId) {
  const req = new XMLHttpRequest()
  req.open("GET", 'http://localhost:3000/config', true)
  req.setRequestHeader('sessionId', sessionId)
  req.send()
  req.onload = function () {
    let res = JSON.parse(req.response)
    const resList = new Map()
    resList.set(14, 'bronze')
    resList.set(15, 'silver')
    resList.set(16, 'geostone')
    resList.set(17, 'gold')
    resList.set(18, 'aluminum')
    for (let entry of res[0].resources) {
      if (entry.id === 14 ||
          entry.id === 15 ||
          entry.id === 16 ||
          entry.id === 17 ||
          entry.id === 18
        ) {
        const key = resList.get(entry.id)
        const amount = res[0].resources.find(doc => doc.id === entry.id).amount;
        document.getElementById(key + "-amt").innerHTML = amount;
      }
    }
  }
}

function profileInit() {

}

function windowInit() {
  if (window.innerWidth < 1024) {
    document.getElementById('time-display').remove()
  }
}

function gameInit() {
  clear()
  // Zoom in and zoom out buttons
  document.getElementById('zoomout').addEventListener('click', function () {
    zoom(0.5);
  });
  document.getElementById('zoomin').addEventListener('click', function () {
    zoom(2);
  });

  // Paning the image
  canvas.addEventListener('mousedown', (ev) => {
    mousePressed = true
  })
  canvas.addEventListener('mousemove', (ev) => {
    if (mousePressed) {
      canvasOffsetX += ev.movementX
      canvasOffsetY += ev.movementY
      draw()
    }
  })
  canvas.addEventListener('mouseup', (ev) => {
    mousePressed = false
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

  document.addEventListener('keydown', (ev) => {
    switch (ev.key) {
      case "ArrowLeft":
        canvasOffsetX -= 20
        break;
      case "ArrowRight":
        canvasOffsetX += 20
        break;
      case "ArrowUp":
        canvasOffsetY -= 20
        break;
      case "ArrowDown":
        canvasOffsetY += 20
        break;
    }
    draw()
  })
  draw()
}

function init() {
  canvas = document.querySelector('canvas')
  ctx = canvas.getContext('2d')

  canvas.width = canvas.getBoundingClientRect().width;
  canvas.height = canvas.getBoundingClientRect().height;

  //Checking if the user is logged in
  let sessionId = localStorage.getItem("sessionId")
  let req = new XMLHttpRequest()
  req.open("GET", 'http://localhost:3000/config', true);
  req.setRequestHeader('sessionId', sessionId);
  req.send()
  req.onload = function () {
    let res = JSON.parse(req.response)
    if (!res || res.length == 0) showNotLoggedIn();
  }
  windowInit()
  resourcesInit(sessionId)

  ctx.font = '6rem Arial'
  ctx.fillStyle = "#fff";
  ctx.fillText('Press "Battle!" to start', 200, 400)
}

window.onload = init
window.addEventListener("load", () => {
  showDateTime()
})