

export const PathSegment = ({pathSegment}) => {
    let style = {
        top: pathSegment.ys + 'rem',
        width: pathSegment.length + 'rem',
        left: pathSegment.xs + 'rem',
        height: pathSegment.height + 'rem',
        backgroundColor: pathSegment.color,
        transform: `rotate(${pathSegment.angle}deg)`
    }
    return (
        <div 
            className="pathSegment" 
            style={style} 
        > 
        </div>
    )
}