import { isCssColor, cssColorToHex, hexToRgb, oppositeRgbColor } from "./colors.js";

function isPointInCircle(x, y, cx, cy, r) {
    var distance = Math.sqrt(Math.pow(x - cx, 2) + Math.pow(y - cy, 2));
    return distance < r;
}

function isPointInSquare(x, y, squareX, squareY, squareSize) {
    const squareCorners = [
        [squareX, squareY],
        [squareX + squareSize, squareY + squareSize]
    ]
    return squareCorners[0][0] <= x && x <= squareCorners[1][0] && squareCorners[0][1] <= y && y <= squareCorners[1][1]
}

class Button {
    constructor({
        text = '',
        font = '20px Arial',
        color,
        shape = 'circle',
        size,
        x,
        y,
        fill = false,
        textColor = 'white',
        textOffset = [0, 0]
    }) {
        if (
            shape != 'circle' &&
            shape != 'square'
        ) { throw new TypeError(`invalid shape: ${shape}`) }
        this.text = text
        this.font = font
        this.color = color
        this.shape = shape
        this.size = size
        this.x = x
        this.y = y
        this.fill = fill
        this.textColor = textColor
        this.textOffset = textOffset
    }

    /**
     * Draws the button to the screen
     */
    draw() {
        let canvas = document.querySelector('canvas')
        let ctx = canvas.getContext('2d')

        ctx.beginPath()
        if (this.shape == 'circle') {
            ctx.arc(
                this.x,
                this.y,
                this.size,
                0,
                2 * Math.PI
            )
        } else if (this.shape == 'square') {
            ctx.rect(
                this.x,
                this.y,
                this.size,
                this.size
            )
        }
        if (this.fill) {
            ctx.fillStyle = this.color
            ctx.fill()
        } else {
            ctx.strokeStyle = this.color
            ctx.stroke()
        }
        ctx.font = this.font
        ctx.fillStyle = this.textColor
        ctx.textAlign = 'center'
        ctx.fillText(this.text, this.x + this.textOffset[0], this.y + this.textOffset[1])
    }

    /**
     * Adds a callback which gets called whenever the button gets clicked on
     * @param {(ev: MouseEvent) => *} callback The function that will get called
     */
    addCallback(callback) {
        let canvas = document.querySelector('canvas')
        canvas.addEventListener('click', (ev) => {
            if (this.shape == 'circle') {
                if (isPointInCircle(ev.offsetX, ev.offsetY, this.x, this.y, this.size)) {
                    callback(ev)
                }
            } else {
                if (isPointInSquare(ev.offsetX, ev.offsetY, this.x, this.y, this.size)) {
                    callback(ev)
                }
            }
        })
    }
}

export { Button }
