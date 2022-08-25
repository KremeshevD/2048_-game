import './game.css'
import useCellSize from "../../Hooks/useCellSize"
import { Field } from "./Field"
import { useDispatch, useSelector } from "react-redux"
import { turnInProgress } from "../../Store/gameReducer"
import { getPointerPosition } from "../../Utils/eventParser"
import { overTurn } from '../../Store/asyncAction'
import { ButtonBlock } from './buttonBlock/ButtonBlock'
import { ModalWindow } from './ModalWindow'
import { Score } from './Score/Score'

export const Game = () => {
    let cellSize = useCellSize()
    const score = useSelector(state => state.game.score)
    const isTurn = useSelector(state => state.game.isTurn)
    const diamonds = useSelector(state => state.game.diamonds)
    const isNewLevel = useSelector(state => state.game.isNewLevel)
    const newLevelData = useSelector(state => state.game.newLevelData)
    const isGameOver = useSelector(state => state.game.isGameOver)

    const dispatch = useDispatch()

    const gameStyle = {
        minWidth: cellSize*6.2,
        minHeight: cellSize*11.4,
    }
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
    const overTurnHandler = () => {
        if(isTurn) {
            dispatch(overTurn())
        }
    }
    if( isGameOver) console.log('Game over')
    
    return (
        <>
        <div className="game" style={gameStyle} onPointerUp={overTurnHandler}>
            <div className="navBar">
                <div>Diamonds: {diamonds}</div>
                <div>Best Score: {score}</div>
            </div>
            <div className="gameField" style={gameFieldStyle}   onPointerMove={moveHandler} >
                <div className="score"><Score score ={score}/></div>
                <hr style={lineStyle}></hr>
                    <Field />
                <hr style={lineStyle}></hr>
                    <ButtonBlock />
                </div>
        </div>
        {isNewLevel && <ModalWindow newLevel = {newLevelData}/>}
        </>
    )
}