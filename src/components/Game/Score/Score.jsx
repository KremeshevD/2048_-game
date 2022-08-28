import { useAnimatedCounter } from "../../../Hooks/useAnimatedCounter"

export const Score = ({score}) => {
    let scoreCount = useAnimatedCounter(score, 5, 50)
    return (
        <>
        <div className="score">{scoreCount}</div>
        </>
    )
}