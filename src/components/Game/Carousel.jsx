import { Cell } from "./Cell"

export const Carousel = ({list, onClick}) => {
    return (
        <div className="carousel">
            {list.map( cell => {
                return (
                    <div className="carouselItem">
                        <Cell cell={cell} onClick={onClick} isSelected={cell.isSelected}/>
                        {cell.price > 0 && <span className="bonusPrice">{cell.price}</span>}
                    </div>
                )
                }
            )}
        </div>
    )
}