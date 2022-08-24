export const parseCellFromEvent = (e) => {
    var xcoord = e.touches? e.touches[0].pageX : e.pageX;
    var ycoord = e.touches? e.touches[0].pageY : e.pageY;
    let xy = e.target.getAttribute('data-xy')
    if (xy) {
        let id = e.target.getAttribute('id')
        let x = +xy[0]
        let y = +xy[2]
        return {x, y, id}
    }
    return false

}
export const getPointerPosition = (e) => {
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
    const cell = parseCellFromEvent(e)
    return {left, top, cell}
}