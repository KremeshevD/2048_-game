import { useEffect, useState } from "react"

export const useAnimatedCounter = (score, steps, stepTime) => {
    const [scoreCount, setScoreCount] = useState(score)
    const [scoreOffset, setScoreOffset] =  useState(0)
    useEffect(() => {
        setScoreOffset(Math.ceil((score-scoreCount)/steps))
    },[score])

    useEffect(() => {
        if(scoreCount >= score ) {
            setScoreOffset(0)
            setScoreCount(score)
        }  else {
            setTimeout(()=> {
                setScoreCount(scoreCount+scoreOffset)
            }, stepTime)
        }
    },[scoreOffset, scoreCount])
    return scoreCount
}
