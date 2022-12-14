import { Cell } from "./Cell"


export class Field {
    #dif = [
        [0,1],
        [1,0],
        [0, -1],
        [-1,0],
        [1,1],
        [-1,-1],
        [-1,1],
        [1, -1]
    ]
    #difForcheck = this.#dif.map(item => `${item[0]},${item[1]}`)
    #size
    #minValue
    #maxValue
    #removeOnNextStep
    #removedCellNumbers = {}
    constructor(size, minValue, maxValue) {
        this.#size = size
        this.#minValue = minValue
        this.#maxValue = maxValue
        this.field = this.getField()
    }

    #getRandom () {
        const value = Math.round((Math.random () * (this.#maxValue-this.#minValue+0.5)) + this.#minValue)
        return value
    }
    isAnyMoveAvalable() {
            let res = false
            this.field.some( line =>{ 
                line.some( cell => {
                    this.#dif.some( offset => {
                        let xCheck = cell.x + offset[0]
                        let yCheck = cell.y + offset[1]
                        let yAvalable = yCheck >= 0 && yCheck < this.field.length
                        let xAvalable = xCheck >= 0 && xCheck < line.length
                        if (yAvalable && xAvalable) {
                            if (this.field[yCheck][xCheck].value === cell.value) {
                                res =  true
                            } 
                        }
                        return res
                    })
                    return res
                })
                return res
            })
            return res
    }

    #removeCellByValue(valueList) {
        let cellList = []
        this.field.forEach(line => 
            line.forEach( cell => {
                    if(valueList.includes(cell.value)) {
                        cellList.push(cell)
                    }
            })
        )
        this.markForDeleting(cellList)
    }

    getCell(x,y) {
        return this.field[y][x]
    }

    getField (x = 5, y = 8) {
        let field = []
        for (let line = 0; line < y; line++) {
            let lineArr = []
            for (let col = 0; col < x; col++ ) {
                let value = this.#getRandom()
                lineArr.push(new Cell({
                    value,
                    y: line,
                    x: col,
                    size: this.#size
                }))
            }
            field.push(lineArr)
        }
        return field
    }

    isNeighbors(cellOne, cellTow) {
        let xDif = cellOne.x-cellTow.x
        let yDif = cellOne.y-cellTow.y
        return this.#difForcheck.includes(`${xDif},${yDif}`)
    }

    removeCells(cells = this.#removeOnNextStep) {
        cells.forEach( cell => {
            this.field[cell.y][cell.x] = ''
        })
        this.#removeOnNextStep = []
    }
    swapCells(cell1, cell2) {
        let x1 = cell1.x
        let y1 = cell1.y
        let x2 = cell2.x
        let y2 = cell2.y
        this.field[y1][x1] = cell2
        this.field[y2][x2] = cell1
        this.update()
    }

    setValueRange(min, max) {
        let prevValue = this.#minValue
        const valueForRemove = []
        if(min-prevValue > 1) {
            for (let i = prevValue; i <= min; i ++){
                valueForRemove.push(i)
            }
        } else {
            valueForRemove.push(prevValue)
        }
        this.#maxValue = max
        this.#minValue = min
        this.#removeCellByValue(valueForRemove)
    }
    renderField() {
        return this.field.reduce((acc, line) => [...acc, ...line], [])
    }
    dropDown() {
        let columnsWithDeletedCells = Object.keys(this.#removedCellNumbers)
        this.field = this.field.map( line => line.map( cell => cell.isDeleted ? '' : cell))
        
        columnsWithDeletedCells.forEach (x => {
            x= +x
            let cellDown = 0 
            for (let y = this.field.length - 1; y >= 0; y--) {
                if(this.field[y][x] === '') {
                    cellDown += 1
                } else if ( cellDown ) {
                    let cell = this.field[y][x]
                    cell.setPosition()
                    this.field[y+cellDown][x] = cell
                    this.field[y][x] = ''
                }
            }
            for (let y = 0; y < cellDown; y++) {
                let value = this.#getRandom()
                let newCell = new Cell({
                    value,
                    y: y-cellDown,
                    x,
                    size: this.#size
                })
                this.field[y][x] = newCell
            }
        }) 
        this.#removedCellNumbers = []
        this.#removeOnNextStep = []
    }
    markForDeleting(cells, newValue) {
        let lastCell
        if(newValue) {
            lastCell = cells.pop()
        }
        this.#removeOnNextStep = cells
       this.#removedCellNumbers = this.#removeOnNextStep.reduce( (acc, cell) => {
        let x = cell.x
        if (!acc[x]){
            acc[x]  = 1
        }else {
            acc[x] += 1
        }
        return acc
        },{})

        if(lastCell) {
            lastCell.value = newValue
            cells.forEach( cell => {
                cell.forDeleting(lastCell.x, lastCell.y)
            })
        } else {
            cells.forEach( cell => {
                cell.forDeleting()
            })
        }
    }
    update = () =>{
        this.field.forEach((line,y) => 
            line.forEach( (cell, x) => {
                    cell.update(x, y)
                    cell.setPosition()
            })
        )
    }
    render = () => {
        let flatField = this.field.reduce((flatField, row) => {
            row.forEach( cell => flatField.push(cell.render()))
            return flatField
        }, [])
        return {
            field: flatField
        }
    }

    restore({cells, minValue, maxValue}) {
        this.#minValue = minValue
        this.#maxValue = maxValue
        cells.forEach( cell => {
            this.field[cell.y][cell.x] = new Cell({
                value: cell.value,
                y: cell.y,
                x: cell.x,
                size: this.#size
            })
        })
    }
}