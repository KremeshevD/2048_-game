import { BonusPrice } from "../BonusPrice/BonusPrise"
import { Cell } from "../Cell/Cell"
import s from "./Carousel.module.css"

export const Carousel = ({list, onClick}) => {
    return (
        <div className={s.carousel}>
            {list.map( cell => {
                return (
                    <div className={s.carouselItem}>
                        <Cell cell={cell} onClick={onClick} isSelected={cell.isSelected} key={cell.id}/>
                        {cell.price > 0 && <BonusPrice price={cell.price} key={ Date.now() + cell.id} />}
                    </div>
                )
                }
            )}
        </div>
    )
}