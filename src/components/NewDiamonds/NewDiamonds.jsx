import s from './NewDiamonds.module.css'

export const NewDiamonds = ({value}) => {
    return (
        <>
            <span className={s.text}>PERFECT</span> 
            <span className={s.newDiamonds}>{value}</span>
        </>
    )
}