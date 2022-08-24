import { useDispatch, useSelector } from "react-redux"
import { destroyCell } from "../../Store/asyncAction"
import { setSwapingCells, startTurn } from "../../Store/gameReducer"
import { parseCellFromEvent } from "../../Utils/eventParser"
import { Cell } from "./Cell"
import { PathSegment } from "./PathSegment"

export const Field = () => {
    const cellSize = useSelector( state => state.game.cellSize)
    const field = useSelector(state => state.game.field)
    const pathSegments = useSelector(state => state.game.pathSegments)
    const isSwapMode = useSelector(state => state.game.isSwapMode)
    const isDestroyMode = useSelector(state => state.game.isDestroyMode)
    const swapingCells = useSelector( state => state.game.swapingCells)
    const maxValueOnField = useSelector( state => state.game.maxValueOnField)
    const fieldStyle = {
        width: cellSize*5.8,
        height: cellSize*9.4,
    }

    const dispatch = useDispatch()
    const pointerDownHandler = (e) => {
        if(!isSwapMode && !isDestroyMode) {
            const cell = parseCellFromEvent(e)
            dispatch(startTurn(cell))
        }
    }
    const bonusModeHandler = (e) => {
        const cell = parseCellFromEvent(e)
        if(isSwapMode) {
            dispatch(setSwapingCells(cell))
        } else if (isDestroyMode) {
            dispatch(destroyCell(cell))
        }
    }
   return ( 

                <div className="field" style={fieldStyle}>
                    {field.map(cell => <Cell 
                        cell={cell} 
                        top={cell.top}
                        key={cell.id} 
                        onPointerDown={pointerDownHandler}
                        onClick = {bonusModeHandler}
                        isSwaping = {swapingCells.filter( spaingCell => spaingCell.id === cell.id).length ? true : false}
                        className="cell"
                        maxValueOnField = {maxValueOnField}
                        /> )}
                    {
                        pathSegments.length && pathSegments.map(item => <PathSegment pathSegment={item} key={item.id}/>)
                    }
                
    </div>
    )
}