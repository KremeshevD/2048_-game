import { BonusPrice } from "../BonusPrice/BonusPrise"
import { Cell } from "../Cell/Cell"
import s from "./Carousel.module.css"

export const Carousel = ({list, onClick}) => {
    return (
        <div className={s.carousel}>
            {list.map( cell => {
                return (
                    <div className={s.carouselItem} key={ Date.now() + cell.id}>
                        <Cell cell={cell} onClick={onClick} isSelected={cell.isSelected} key={cell.id}/>
                        {cell.price > 0 && <BonusPrice price={cell.price} />}
                    </div>
                )
                }
            )}
        </div>
    )
}