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
    /** The text that goes in the button */
    text
    /** The font of the text in the button */
    font
    /** The color of the button, this is either the color of the outline, or the filling of the button, depending on the `fill` parameter */
    color
    /** The shape of this button */
    shape
    /** 
     * The size of the button, if the shape is 'circle', this will be the radius of the square as a number,
     * otherwise this will be an array with 2 numbers in it where the first number is the width of the rectangle
     * and the second is the height 
     */
    size
    x
    y
    /**Whether to fill the shape or not
     * 
     * When this value is `false`, the button will be drawn something like this: ▭
     * When it is `true` it will be drawn like this: ▬
     */
    fill
    textColor
    textOffset
    /**
     * A function that gets called when the button is clicked on
     * @type {null | (ev: MouseEvent) => *}
     */
    onclick = null

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
     * The size of the button, if the shape is 'circle', this will be the radius of the square as a number,
     * otherwise this will be an array with 2 numbers in it where the first number is the width of the rectangle
     * and the second is the height
     * @param {number} params.x The x coordinate of this button
     * @param {number} params.y The y coordinate of this button
     * @param {boolean} params.fill Whether to fill the shape or not
     * 
     * When this value is `false`, the button will be drawn something like this: ▭
     * When it is `true` it will be drawn like this: ▬
     * @param {string | CanvasGradient | CanvasPattern} params.textColor The color of the text inside the button
     * @param {number[]} [params.textOffset=[0, 0]] The offset of the text in the button, the text coordinates will be `[textOffset[0] + x, textOffset[1] + y]`
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
        this.onclick = null
    }

    /**
     * Draws the button to the screen
     */
    draw() {
        const canvas = document.querySelector('canvas')
        const ctx = canvas.getContext('2d')

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
        
        if (this.onclick === null) {
            return
        }

        this.callback = (ev) => {
            if (this.shape == 'circle') {
                if (isPointInCircle(ev.offsetX, ev.offsetY, this.x, this.y, this.size)) {
                    this.onclick(ev)
                }
            } else {
                if (isPointInRect(ev.offsetX, ev.offsetY, this.x, this.y, this.size)) {
                    this.onclick(ev)
                }
            }
        }
        canvas.addEventListener('click', this.callback)
    }

    removeCallback() {
        const canvas = document.querySelector('canvas')
        canvas.removeEventListener('click', this.callback)
    }
}

export { Button }
