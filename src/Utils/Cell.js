export class Cell {
    constructor({value, x, y, size}) {
        this._value = value
        this.x = x
        this.y = y
        this.xy = `${this.x},${this.y}`
        this.id = `${this.x},${this.y}-${Date.now()}`
        this.size = size
        this.setPosition()
        this.#setColor()
    }
    #setColor() {
        const colors = ['red', 'green', 'Lime', 'blue', 'pink' ,'brown', 'Chartreuse', 'Aquamarine', 'purple','violet', 'yellow' ]
        this.color = colors[this._value%colors.length]
    }
    set value(newValue) {
            if (newValue > this.value) {
                this._value = newValue
                this.#setColor()
            } else {
                this._value = newValue
            }
    }
    get value() {
        return this._value
    }
    setPosition() {
        if (this.x === 0) {
            this.left = this.size*this.x
        } else {
            this.left = Math.floor(this.size/5)*this.x + this.size*this.x
        }
        if (this.y === 0) {
            this.top = this.size*this.y
        } else {
            this.top = Math.floor(this.size/5)*this.y + this.size*this.y
        }
    }
    update(x,y) {
        this.x = x
        this.y = y
        this.xy = `${x},${y}`
    }
    
}