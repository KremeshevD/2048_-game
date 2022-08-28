import { useDispatch, useSelector } from "react-redux"
import { turnInProgress } from "../../../Store/gameReducer"
import { getPointerPosition } from "../../../Utils/eventParser"
import { ButtonBlock } from "../buttonBlock/ButtonBlock"
import { Field } from "../Field"
import { Score } from "../Score/Score"

export const GameField = () => {
    const score = useSelector(state => state.game.score)
    const isTurn = useSelector(state => state.game.isTurn)
    const cellSize = useSelector(state => state.game.cellSize)
    const dispatch = useDispatch()


    const gameFieldStyle = {
        width: cellSize*5.8
    }
    const lineStyle = {
        marginTop: cellSize*0.2,
        marginBottom: cellSize*0.2
    }
    const moveHandler = (e) => {
        if (isTurn){
            const pointerPosition = getPointerPosition(e)
            dispatch(turnInProgress(pointerPosition))
        }
    }
    return (
        <div className="gameField" style={gameFieldStyle}   onPointerMove={moveHandler} >
        <div className="score"><Score score ={score}/></div>
        <hr style={lineStyle}></hr>
            <Field />
        <hr style={lineStyle}></hr>
            <ButtonBlock />
    </div>
    )
}