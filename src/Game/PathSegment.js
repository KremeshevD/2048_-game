export class PathSegment {
    #offsetY 
    constructor(xs,ys, color, xe = xs, ye = ys) {
        this.height = 0.5 
        this.#offsetY = this.height/2
        this.xs = xs
        this.ys = ys - this.#offsetY
        this.xe = xe
        this.ye = ye - this.#offsetY
        this.id = xs+''+ys+''+Date.now()
        this.color = color
        this.setVector()
    }

    setEndPoint(x, y) {
        this.xe = x
        this.ye = y - this.#offsetY
        this.setVector()
    }
    setVector() {
        let length = Math.sqrt(Math.pow((this.xe-this.xs), 2) + Math.pow((this.ye-this.ys), 2))
        let deg = Math.atan2(this.ys - this.ye, this.xs - this.xe) * 180 / Math.PI
        this.length = Math.floor(length)
        this.angle = Math.floor(deg) - 180
    }
    render() {
        return {
            xs: this.xs,
            ys: this.ys,
            xe: this.xe,
            ye: this.ye,
            color: this.color,
            id: this.id,
            angle: this.angle,
            length: this.length,
            height: this.height
        }
    }
}