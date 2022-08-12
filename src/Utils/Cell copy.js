export class Cell {
    constructor({value, x, y, color, size}) {
        this.value = value
        this.x = x
        this.y = y
        this.id = `${this.x},${this.y}-${Date.now()}`
        this.color = color
        this.size = size
        this.#setPosition()
    }
    #setPosition() {
        if (this.x == 0) {
            this.left = this.size*this.x
        } else {
            this.left = Math.floor(this.size/5)*this.x + this.size*this.x
        }
        if (this.y == 0) {
            this.top = this.size*this.y
        } else {
            this.top = Math.floor(this.size/5)*this.y + this.size*this.y
        }
    }
    update(x,y) {
        this.x = x
        this.y = y
        this.#setPosition()
    }
}