import { Cell } from "./Cell"
import { PathSegment } from "./PathSegment"


export class Field {
    initialValue = [2, 4, 8, 16, 32, 64, 128,256]
    colors = ['red', 'green', 'yellow', 'blue', 'pink' ,'brown', 'Chartreuse', 'Aquamarine', 'purple','violet', 'Lime' ]
    curentValue = [...this.initialValue]
    dif = [
        [0,1],
        [1,0],
        [0, -1],
        [-1,0],
        [1,1],
        [-1,-1],
        [-1,1],
        [1, -1]
    ]
    difForcheck = this.dif.map(item => `${item[0]},${item[1]}`)
    visited = {}
    pathSegments = []
    secectedCells = []
    constructor(size) {
        this.size = size
        this.field = this.getField()
    }
    #getRandom () {
        let index = Math.floor(Math.random() * (this.curentValue.length-1))
        let value = this.curentValue[index]
        return value
    }
    #getColor (value) {
        let index = this.curentValue.indexOf(value)
        let color = this.colors[index]
        return color
    }
    getField (x = 5, y = 8) {
        let field = []
        for (let line = 0; line < y; line++) {
            let lineArr = []
            for (let col = 0; col < x; col++ ) {
                let value = this.#getRandom()
                let color = this.#getColor(value)
                lineArr.push(new Cell({
                    value,
                    color,
                    y: line,
                    x: col,
                    size: this.size
                }))
            }
            field.push(lineArr)
        }
        return field
    }
    #isMoveCorrect(xy) {
        let xCandidate = +xy[0]
        let yCandidate = +xy[2]
        let isVisited = !this.visited[xy]
        let cellTarget = this.field[yCandidate][xCandidate]
        let xLastCell = this.selectedCells[this.selectedCells.length-1].x
        let yLastCell = this.selectedCells[this.selectedCells.length-1].y
        let cellPrev = this.field[yLastCell][xLastCell]
        let dif = `${xCandidate-xLastCell},${yCandidate-yLastCell}`
        let isDifValid = this.difForcheck.includes(dif)
        let isValueEqual = cellPrev.value == cellTarget.value || this.selectedCells.length > 1 && cellTarget.value/cellPrev.value == 2
        return isVisited && isValueEqual && isDifValid
    } 
    #isRollBack(xy) {
        let xCandidate = +xy[0] 
        let yCandidate = +xy[2]
        if(this.PathSegments.length < 1) return false
        let lastPathPoint = this.selectedCells[this.selectedCells.length-2]
        return xCandidate == lastPathPoint.x && lastPathPoint.y == yCandidate 
    }
    #removeCells(cells) {
        cells.forEach( cell => {
            this.field[cell.y][cell.x] = ''
        })
    }
    dropDown(removedCells) {
        console.log(removedCells)
        let removedCellNumbers = removedCells.reduce( (acc, cell) => {
            let x = cell.x
            if (!acc[x]){
                acc[x]  = 1
            }else {
                acc[x] += 1
            }
            return acc
        },{})
        let columnsWithDeletedCells = Object.keys(removedCellNumbers)
        columnsWithDeletedCells.forEach (x => {
            x= +x
            let cellDown = 0 
            for (let y = this.field.length - 1; y >= 0; y--) {
                if(!this.field[y][x]) {
                    cellDown += 1
                } else if ( cellDown ) {
                    let cell = this.field[y][x]
                    cell.update(x,y)
                    this.field[y+cellDown][x] = cell
                    this.field[y][x] = ''
                }
            }
            for (let y = 0; y < cellDown; y++) {
                let value = this.#getRandom()
                let color = this.#getColor(value)
                let newCell = new Cell( value, x, y-cellDown, color)
                this.field[cellDown-1-y][x] = newCell
            }
        }) 
        setTimeout (this.update.bind(this), 0)

    }
    startChoose = (e) => {
        this.moveInProggres = true
        this.PathSegments = []
        this.visited = {}
        let xy = e.target.getAttribute('data-xy');
        let x = +xy[0]
        let y = +xy[2]
        let cell = this.field[y][x]
        this.visited[xy] = cell
        let pathX = cell.left + cell.size/2
        let pathY = cell.top + cell.size/2
        let line = new PathSegment(pathX, pathY, cell.color)
        this.PathSegments.push(line)
        this.selectedCells.push({x,y})
    }
    move = (e) => {
        if (this.moveInProggres) {
            let left
            let top
            if(!e.target.getAttribute('data-xy')) {
                left = e.nativeEvent.offsetX
                top = e.nativeEvent.offsetY
            } else {
                let parentNode = e.target.parentNode
                let parentCoordinate = parentNode.getBoundingClientRect()
                left = Math.floor(e.clientX - parentCoordinate.left)
                top = Math.floor(e.clientY - parentCoordinate.top)
            }
            let curPath = this.PathSegments[this.PathSegments.length-1]
            curPath.setEndPoint(left-1, top-1)
            let xy = e.target?.getAttribute('data-xy')
            if(xy && this.#isMoveCorrect(xy)) {
                let x = +xy[0]
                let y = +xy[2]
                let cell = this.field[y][x]
                this.visited[xy] = cell
                let pathX = cell.left + cell.size/2
                let pathY = cell.top + cell.size/2
                let newPathSegment = new PathSegment(curPath.xs, curPath.ys, cell.color)
                newPathSegment.setEndPoint(pathX, pathY)
                this.PathSegments.pop()
                this.PathSegments.push(newPathSegment)
                let line = new PathSegment(pathX, pathY, cell.color)
                this.PathSegments.push(line)
                this.selectedCells.push({x,y})
            } else if(xy && this.#isRollBack(xy)) {
                let xyCurPath = `${curPath.x},${curPath.y}`
                delete this.visited[xyCurPath]
                this.PathSegments.pop()
                this.selectedCells.pop()
                let removedPathSegment = this.path.pop()
                let line = new PathSegment(removedPathSegment.xs, removedPathSegment.ys, removedPathSegment.color)
                this.PathSegments.push(line) 
            }
        }
    }
    endMove() {
        let {x,y} = this.selectedCells[this.selectedCells.length-1]
        let newValue = 0
        for(let key in this.visited) {
            newValue += this.visited[key].value
        }
        newValue = Math.pow(2, Math.ceil(Math.log(newValue)/Math.log(2)))
        console.log(this.visited)
        let mergedCell = this.visited[`${x},${y}`]
        mergedCell.value = newValue
        if (newValue > this.curentValue[this.curentValue.length-1]) {
            console.log('Новый уровень')
                this.curentValue.push(newValue)
                this.newlevel = true
        }
        mergedCell.color = this.#getColor(newValue)
        delete this.visited[`${x},${y}`]
        let visitedCellArr = Object.keys(this.visited).map( xy => this.field[xy[2]][xy[0]])
        this.#removeCells(visitedCellArr)
        this.dropDown(visitedCellArr)
        /*if (this.isEnd()) {
            console.log('End')
        }
        if (this.newlevel) {
            console.log('NewLevel')
            this.newlevel = false
            let smallestNumber = this.curentValue.shift()
            let cellsForRemove = this.#findCellByValue(smallestNumber)
            console.log(cellsForRemove)
            this.#removeCells(cellsForRemove)
            this.dropDown(cellsForRemove)

        }*/
    }
}