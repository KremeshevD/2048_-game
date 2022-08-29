import { Cell } from "./Cell"

export const Carousel = ({list, onClick}) => {
    return (
        <div className="carousel">
            {list.map( cell => 
                <Cell cell={cell} onClick={onClick}/>
            )}
        </div>
    )
}