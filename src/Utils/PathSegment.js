export class PathSegment {
    constructor(xs,ys, color, xe = xs, ye = ys) {
        this.xs = xs
        this.ys = ys
        this.xe = xe
        this.ye = ye
        this.id = xs+''+ys+''+Date.now()
        this.color = color
        this.setVector()
    }

    setEndPoint(x, y) {
        this.xe = x
        this.ye = y
        this.setVector()
    }
    setVector() {
        let length = Math.sqrt(Math.pow((this.xe-this.xs), 2) + Math.pow((this.ye-this.ys), 2))
        let deg = Math.atan2(this.ys - this.ye, this.xs - this.xe) * 180 / Math.PI
        this.length = Math.floor(length)
        this.angle = Math.floor(deg) - 180
    }

}