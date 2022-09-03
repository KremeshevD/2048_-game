import s from './BonusPrice.module.css'

export const BonusPrice = ({price}) => {
    return (
        <span className={s.bonusPrice}>{price}</span>
    )
}