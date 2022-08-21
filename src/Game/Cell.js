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
        this.isVisited = false
        this.shoulRemove = false
        this.isUnited = false
        this.isDeleted = false
    }
    #setColor() {
        const colors = ['red', 'green', 'Lime', 'blue', 'pink' ,'brown', 'Chartreuse', 'Aquamarine', 'purple','violet', 'yellow' ]
        this.color = colors[this._value%colors.length]
    }
    set value(newValue) {
            if (newValue > this.value) {
                this._value = newValue
                this.isUnited = true
                this.#setColor()
            } else {
                this._value = newValue
            }
    }
    get value() {
        return this._value
    }
    forDeleting(x = this.x, y = this.y) {
        this.isDeleted = true
        this.update(x, y)
        this.setPosition()
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
        this.isUnited = false
        this.isVisited = false
        //this.isDeleted = false
    }
    setVisited(val) {
        this.isVisited = val
    }
    render() {
        return {
           size: this.size,
           id: this.id,
           value: this._value,
           x: this.x,
           y: this.y,
           xy: this.xy,
           left: this.left,
           top: this.top,
           color: this.color,
           isVisited: this.isVisited,
           shoulRemove: this.shoulRemove,
           isUnited: this.isUnited,
           isDeleted: this.isDeleted
        }
    }
    
}