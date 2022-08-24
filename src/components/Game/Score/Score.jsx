import { useEffect, useState } from "react"

export const Score = ({score}) => {
    const [scoreCount, setScoreCount] = useState(score)
    const [scoreOffset, setScoreOffset] =  useState(0)
    useEffect(() => {
        setScoreOffset(Math.ceil((score-scoreCount)/5))
    },[score])

    useEffect(() => {
        if(scoreCount >= score ) {
            setScoreOffset(0)
            setScoreCount(score)
        }  else {
            setTimeout(()=> {
                setScoreCount(scoreCount+scoreOffset)
            }, 100)
        }
    },[scoreOffset, scoreCount])


    return (
        <>
        <div>Best Score: {scoreCount}</div>
        </>
    )
}