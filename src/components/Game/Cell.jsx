export const Cell = ({cell, onPointerDown, top, onClick, visited}) => {
    let style = {
        top: top,
        width: cell.size,
        left: cell.left,
        height: cell.size,
        backgroundColor: cell.color,
    }
    let classes = 'cell'
    const isVisited = visited && cell.id === visited.id ? true : false
    if (isVisited) {
        classes += " pick"
        
    }
    const value = Math.pow(2, cell.value)
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