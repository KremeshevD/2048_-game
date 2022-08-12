import { PathSegment } from "./PathSegment"

export class Path {
    constructor() {
        this.pathSegments = []
        this.pathPoints = []
    }
    
    addNewPoint(newPoint) {
        this.pathPoints.push(newPoint)
        if (this.pathPoints.length > 1) {
            let prevPoint = this.pathPoints[this.pathPoints.length-2]
            this.pathSegments.pop()
            const pathSegment = new PathSegment(...this.#getPathSegmentDataFromCell(prevPoint,newPoint))
            this.pathSegments.push(pathSegment)
            const searchLine = new PathSegment(...this.#getPathSegmentDataFromCell(newPoint))
            this.pathSegments.push(searchLine)

        } else {
            const pathSegment = new PathSegment(...this.#getPathSegmentDataFromCell(newPoint))
            this.pathSegments.push(pathSegment)
        }
    }
    #getPathSegmentDataFromCell(cellStart, cellEnd) {
        const cellSize = cellStart.size;
        const offset = cellSize/2
        if(cellEnd) {
            return [cellStart.left+offset, cellStart.top+offset, cellStart.color, cellEnd.left+offset, cellEnd.top+offset]
        } else {
            return [cellStart.left+offset, cellStart.top+offset, cellStart.color]
        }
    }
    updateSearchLine(x, y) {
        const searchLine = this.pathSegments[this.pathSegments.length-1]
        searchLine.setEndPoint(x, y)
    }
    isRollBack(point) {
        if(this.pathPoints.length > 1 && this.pathPoints[this.pathPoints.length-2].x == point.x && this.pathPoints[this.pathPoints.length-2].y == point.y) {
            this.pathSegments.pop()
            let deletingSegment = this.pathSegments.pop()
            this.pathPoints.pop()
            let newNotFinishedSegment = new PathSegment(deletingSegment.xs, deletingSegment.ys, deletingSegment.color)
            this.pathSegments.push(newNotFinishedSegment)
        }
    }
    getLastPathPoint() {
        return this.pathPoints[this.pathPoints.length-1]
    }
    getVisitedPoints() {
        return this.pathPoints.slice()
    }
    isVisited(point) {
        return this.pathPoints.reduce( (acc, item) => {
            if(point.id === item.id)  {
                acc = true
            }
            return acc
        }, false)
    }
    clearPath() {
        this.pathPoints = []
        this.pathSegments = []
    }


}