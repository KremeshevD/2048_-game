import './game.css'
import { useDispatch, useSelector } from "react-redux"
import { overTurn } from '../../Store/asyncAction'
import { StartScreen } from './StartScreen'
import getCellSize from '../../Hooks/getCellSize'
import { useRef } from 'react'
import { Header } from './Header'
import { GameField } from './GameField/GameField'
import { NewLevel } from './NewLevel'

export const Game = () => {
    let cellSize = useRef(getCellSize()).current
    const isTurn = useSelector(state => state.game.isTurn)
    const isNewLevel = useSelector(state => state.game.isNewLevel)
    const isGameOver = useSelector(state => state.game.isGameOver)
    const isRestored = useSelector(state => state.game.isRestored)

    const dispatch = useDispatch()


    const gameStyle = {
        minWidth: cellSize*6.2,
        minHeight: cellSize*11.4,
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
            <Header />
            {isRestored ?
            <StartScreen/>
            :
            <GameField/>
            }
        </div>
        {isNewLevel && <NewLevel />}
        </>
    )
}