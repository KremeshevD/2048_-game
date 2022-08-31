import { useAnimatedCounter } from "../../Hooks/useAnimatedCounter"
import { valueToStringNumber } from "../../Utils/getValueForDisplay"
import s from './Score.module.css'


export const Score = ({score}) => {
    let scoreCount = useAnimatedCounter(score, 5, 50)
    let strScore = valueToStringNumber(scoreCount,6)
    return (
        <div className={s.score}>{strScore}</div>
    )
}