import { Field } from "./field";
import { Path } from "./Path";

export class Game {
    constructor(cellSize) {
        this.cellSize = cellSize
        this.minValue = 1
        this.maxValue = 8   
        this.field = new Field(cellSize, this.minValue, this.maxValue)
        this.maxValueOnfiel = 8
        this.score = 0
        this.daimonds = 0
        this.path=new Path()
        this.newLevel = false
        this.levelInfo = {}
        this.score = 0
        this.isGameOver = false
    }
    #parseCellFromEvent(e) {
        var xcoord = e.touches? e.touches[0].pageX : e.pageX;
        var ycoord = e.touches? e.touches[0].pageY : e.pageY;
        let xy = document.elementFromPoint(xcoord, ycoord).getAttribute('data-xy')
        if (xy) {
            let x = +xy[0]
            let y = +xy[2]
            return this.field.getCell(x,y)
        }
        return false

    }
    #getPointerPosition(e) {
        let left
        let top
        if(e.type === "touchmove") {
            if(!e.target.getAttribute('data-xy')) {
                left = e.targetTouches[0].offsetX
                top = e.targetTouches[0].offsetY
            } else {
                let parentNode = e.target.parentNode
                let parentCoordinate = parentNode.getBoundingClientRect()
                left = Math.floor(e.targetTouches[0].clientX - parentCoordinate.left)
                top = Math.floor(e.targetTouches[0].clientY - parentCoordinate.top)
            }
        } else {
            if(!e.target.getAttribute('data-xy')) {
                left = e.offsetX
                top = e.offsetY
            } else {
                let parentNode = e.target.parentNode
                let parentCoordinate = parentNode.getBoundingClientRect()
                left = Math.floor(e.clientX - parentCoordinate.left)
                top = Math.floor(e.clientY - parentCoordinate.top)
            }
        }
 
        return [left, top]
    }
    #getNewValue(value) {

        return Math.ceil(Math.log(value)/Math.log(2))
    }
    #getTurnScore(cellList) {
        return cellList.reduce((acc, cell) => {
            return acc += Math.pow(2, cell.value)
        }, 0)
    }
    #isMoveCorrect(cell) {
        if(cell) {
            const isVisited = this.path.isVisited(cell)
            const prevPoint = this.path.getLastPathPoint()
            const isNeighbors = this.field.isNeighbors(prevPoint,cell)
            const isValueCorrect = cell.value === prevPoint.value || (this.path.pathSegments.length > 1 && cell.value === prevPoint.value + 1)
            if(!isVisited && isNeighbors && isValueCorrect) {
                return cell
            }
        }
        return false
    }
    #isNewLevel(value) {
                if (value > this.maxValueOnfiel) {
                    const dif = this.minValue - this.maxValueOnfiel
                    this.maxValueOnfiel = value
                    if(this.maxValueOnfiel >= 11 && this.maxValue === 8) {
                        this.maxValue += 1
                        this.minValue += 1
                        this.daimonds += 30
                        this.newLevel = true
                    } else if (this.maxValueOnfiel >= 14 && this.maxValue === 9) {
                        this.maxValue += 1
                        this.minValue += 1   
                        this.daimonds += 30+this.maxValue-7
                        this.newLevel = true                     
                    } else if (this.maxValueOnfiel >= 17) {
                        this.maxValue += dif
                        this.minValue += dif  
                        this.daimonds += 30+this.maxValue-7
                        this.newLevel = true                     
                    }
                } else {
                    this.newLevel = false
                }
    }
    restart() {
        this.minValue = 1
        this.maxValue = 8   
        this.field = new Field(this.cellSize, this.minValue, this.maxValue)
        this.maxValueOnfiel = 8
        this.score = 0
        this.path=new Path()
        this.newLevel = false
        this.levelInfo = {}
        this.score = 0
        this.isGameOver = false
    }
    toNextLvl() {
        this.field.setValueRange(this.minValue, this.maxValue)
    }
    isNewLevel() {
        return this.newLevel
    }
    startTurn(e) {
        const cell = this.#parseCellFromEvent(e)
        this.path.addNewPoint(cell)
    }

    turnInProgress(e) {
        if (true) {
            const [left, top] = this.#getPointerPosition(e)
            this.path.updateSearchLine(left,top)
            const cell = this.#parseCellFromEvent(e)
            const isMoveCorrect = this.#isMoveCorrect(cell)
            if(isMoveCorrect) {
                this.path.addNewPoint(cell)
            }
            if (cell){
                this.path.isRollBack(cell)
            }
        }
    }
    endTurn() {
        const visitedCells = this.path.getVisitedPoints()
        if(visitedCells.length > 1) {
            const turnScore = this.#getTurnScore(visitedCells)
            const newValue = this.#getNewValue(turnScore)
            this.score += turnScore
            const lastCell = visitedCells.pop()
            lastCell.value = newValue
            this.isGameOver = this.field.isAnyMoveAvalable()
            if (visitedCells.length > 5) {
                this.daimonds += 3
            }
            this.field.removeCells(visitedCells)
            this.#isNewLevel(newValue)
        }
        this.path.clearPath()
        
    }
    destroyCell(e) {
        const cell = this.#parseCellFromEvent(e)
        this.field.removeCells([cell])
    }
    swapCells([e1, e2]) {
        const cell1 = this.#parseCellFromEvent(e1)
        const cell2 = this.#parseCellFromEvent(e2)
        this.field.swapCells(cell1, cell2)
    }
}