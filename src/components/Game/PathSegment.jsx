

export const PathSegment = ({pathSegment}) => {
    let style = {
        top: pathSegment.ys,
        width: pathSegment.length,
        left: pathSegment.xs,
        height: 5,
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