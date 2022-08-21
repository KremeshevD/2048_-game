import { Field } from "./field";
import { Path } from "./Path";

const diamondBonusForLength = 3

export class Game {
    constructor(cellSize) {
        this.cellSize = cellSize
        this.minValue = 1
        this.maxValue = 8  
        this.field = new Field(cellSize, this.minValue, this.maxValue)
        this.maxValueOnfiel = 8
        this.score = 0
        this.diamonds = 0
        this.path=new Path()
        this.newLevel = false
        this.levelInfo = {}
        this.score = 0
        this.isGameOver = false
        this.isNewLevel = false
        this.newLevelData = {}
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
            cell = this.field.getCell(cell.x,cell.y)
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
                    if(this.maxValueOnfiel >= 9 && this.maxValue === 8) {
                        this.maxValue += 1
                        this.minValue += 1
                        this.diamonds += 30
                        this.newLevelData = {
                            newValue: this.maxValue,
                            removedValue: this.minValue - 1,
                            newMaxValue: this.maxValueOnfiel
                        }
                        this.isNewLevel = true
                    } else if (this.maxValueOnfiel >= 14 && this.maxValue === 9) {
                        this.maxValue += 1
                        this.minValue += 1   
                        this.diamonds += 30+this.maxValue-7
                        this.isNewLevel = true  
                        this.newLevelData = {
                            newValue: this.maxValue,
                            removedValue: this.minValue - 1,
                            newMaxValue: this.maxValueOnfiel
                        }                   
                    } else if (this.maxValueOnfiel >= 17) {
                        this.maxValue += dif
                        this.minValue += dif  
                        this.diamonds += 30+this.maxValue-7
                        this.isNewLevel = true 
                        this.newLevelData = {
                            newValue: this.maxValue,
                            removedValue: this.minValue - 1,
                            newMaxValue: this.maxValueOnfiel
                        }                    
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
        this.isNewLevel = false
        this.newLevelData = {}
    }
    isNewLevel() {
        return this.newLevel
    }
    startTurn(cell) {
        cell = this.field.getCell(cell.x, cell.y)
        this.path.addNewPoint(cell)
        cell.setVisited(true)
    }

    turnInProgress({left, top, cell}) {
        if (true) {
            this.path.updateSearchLine(left,top)
            const isMoveCorrect = this.#isMoveCorrect(cell)
            if(isMoveCorrect) {
                cell = this.field.getCell(cell.x, cell.y)
                cell.setVisited(true)
                this.path.addNewPoint(cell)
            }
            if (cell){
                cell = this.field.getCell(cell.x, cell.y)
                this.path.isRollBack(cell)
            }
        }
    }
    turnOver() {
        const visitedCells = this.path.getVisitedPoints()
        if(visitedCells.length > 1) {
            const turnScore = this.#getTurnScore(visitedCells)
            const newValue = this.#getNewValue(turnScore)
            this.score += turnScore
            this.field.markForDeleting(visitedCells, newValue)
            this.isGameOver = this.field.isAnyMoveAvalable()
            this.#isNewLevel(newValue)
            if (visitedCells.length > 5) {
                    this.diamonds += diamondBonusForLength
            }    
        }
        this.path.clearPath()  
    }
    toNextStep() {
        this.field.dropDown()
        this.field.update()
    }
    destroyCell(cell) {
        cell = this.field.getCell(cell.x, cell.y)
        this.field.markForDeleting([cell])
    }
    swapCells([c1, c2]) {
        const cell1 = this.field.getCell(c1.x, c1.y)
        const cell2 = this.field.getCell(c2.x, c2.y)
        this.field.swapCells(cell1, cell2)
    }
    render() {
       return  {
            diamonds: this.diamonds,
            cellSize: this.cellSize,
            minValue: this.minValue,
            maxValue: this.maxValue,
            score: this.score,
            maxValueOnfiel: this.maxValueOnfiel,
            isNewLevel: this.isNewLevel,
            isGameOver: this.isGameOver,
            newLevelData: this.newLevelData, 
            ...this.path.render(),
            ...this.field.render(),

        }
    }
    
}
