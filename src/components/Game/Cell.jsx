import { useEffect } from "react"
import { getValueForDisplay } from "../../Utils/getValueForDisplay"

export const Cell = ({cell, onPointerDown, top, onClick, isSwaping}) => {
    let style = {
        top: top,
        width: cell.size,
        left: cell.left,
        height: cell.size,
        backgroundColor: cell.color,
    }
    let classes = 'cell'
    classes += cell.isVisited ? " pick" : ""
    classes += isSwaping ?  " swapingCell" : ""
    classes += cell.isUnited ? " unite" : ""
    classes += cell.isDeleted ? " deletedCell" : ""
    
    const value = getValueForDisplay(cell.value)

    return (
        <div 
            className={classes}
            style={style} 
            onPointerDown={onPointerDown}
            onClick = {onClick}
            data-xy={cell.xy}
            id = {cell.id}
        > 
            {value}
        </div>
    )
}