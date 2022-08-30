import { useDispatch, useSelector } from "react-redux"
import { destroyCell } from "../../Store/asyncAction"
import { setSwapingCells, startTurn } from "../../Store/gameReducer"
import { parseCellFromEvent } from "../../Utils/eventParser"
import { Cell } from "./Cell"
import { PathSegment } from "./PathSegment"

export const Field = () => {
    const field = useSelector(state => state.game.field)
    const pathSegments = useSelector(state => state.game.pathSegments)
    const isSwapMode = useSelector(state => state.game.isSwapMode)
    const isDestroyMode = useSelector(state => state.game.isDestroyMode)
    const selectedCells = useSelector( state => state.game.selectedCells)
    const maxValueOnField = useSelector( state => state.game.maxValueOnField)

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

                <div className="field">
                    {field.map(cell => <Cell 
                        cell={cell} 
                        top={cell.top}
                        key={cell.id} 
                        onPointerDown={pointerDownHandler}
                        onClick = {bonusModeHandler}
                        isSelected = {selectedCells.filter( selectedCell => selectedCell.id === cell.id).length ? true : false}
                        className="cell"
                        maxValueOnField = {maxValueOnField}
                        /> )}
                    {
                        pathSegments.length && pathSegments.map(item => <PathSegment pathSegment={item} key={item.id}/>)
                    }
                
    </div>
    )
}