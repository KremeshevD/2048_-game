export const parseCellFromEvent = (e) => {
    const isTouch = ('ontouchstart' in document.documentElement)
    let cell
    if(isTouch) {
        const xcoord = e.pageX;
        const ycoord = e.pageY;
        cell = document.elementFromPoint(xcoord, ycoord).getAttribute('data-xy')
    } else {
        cell = e.target.getAttribute('data-xy')
    }
    if (cell) {
        let id = e.target.getAttribute('id')
        let x = +cell[0]
        let y = +cell[2]
        return {x, y, id}
    }
    return false
}
export const getPointerPosition = (e) => {
    let coordinate = e.target.closest('#field').getBoundingClientRect()
    let remSize = parseFloat(getComputedStyle(document.querySelector('html')).fontSize)
    let left = (e.clientX - coordinate.left)/remSize
    let top =  (e.clientY - coordinate.top)/remSize
    const cell = parseCellFromEvent(e)
    return {left, top, cell}
}