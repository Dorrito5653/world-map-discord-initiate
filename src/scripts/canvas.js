function isPointInCircle(x, y, cx, cy, r) {
    var distance = Math.sqrt(Math.pow(x - cx, 2) + Math.pow(y - cy, 2));
    return distance < r;
}

function isPointInRect(x, y, squareX, squareY, squareSize) {
    const squareCorners = [
        [squareX, squareY],
        [squareX + squareSize[0], squareY + squareSize[1]]
    ]
    return squareCorners[0][0] <= x && x <= squareCorners[1][0] && squareCorners[0][1] <= y && y <= squareCorners[1][1]
}

class Button {
    /**
     * @param {Object} params
     * @param {string} [params.text='']
     * The text that goes in the button, if you want no text, leave this option blank or supply `''`
     * @param {string} [params.font='20px Arial']
     * The font of the text in the button, you can probably put any string which is valid for the CSS font attribute
     * @param {string | CanvasGradient | CanvasPattern} params.color
     * The color of the button, this is either the color of the outline, or the filling of the button, depending on the `fill` parameter
     * @param {'circle' | 'rect'} [params.shape='circle']
     * The shape of this button, only circle and rect are supported
     * @param {number | number[]} params.size
     * The size of the button, if the shape is 'circle', this will be the radius of the square as a `number`,
     * otherwise this will be an array with 2 numbers in it where the first number is the width of the rectangle
     * and the second is the height
     * @param {number} params.x The x coordinate of this button
     * @param {number} params.y The y coordinate of this button
     * @param {boolean} params.fill Whether to fill the shape or not
     * 
     * When this value is `false`, the button will be drawn something like this: ▭
     * When it is `true` it will be drawn like this: ▬
     * @param {string | CanvasGradient | CanvasPattern} params.textColor The color of the text inside the button
     * @param {number[]} [params.textOffset=[0, 0]]
     */
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
            shape != 'rect'
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
        } else if (this.shape == 'rect') {
            ctx.rect(
                this.x,
                this.y,
                this.size[0],
                this.size[1],
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
                if (isPointInRect(ev.offsetX, ev.offsetY, this.x, this.y, this.size)) {
                    callback(ev)
                }
            }
        })
    }
}

export { Button }
