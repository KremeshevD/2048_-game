import { useDispatch, useSelector } from "react-redux"
import { overTurn } from '../../Store/asyncAction'
import { StartScreen } from '../StartScren/StartScreen' 
import { Header } from '../Header/Header'
import { GameField } from '../GameField/GameField'
import { NewLevel } from '../NewLevel/NewLevel'
import useCellSize from '../../Hooks/useCellSize'
import { Restart } from '../Restart/Restart'
import { GameOver } from '../GameOver/GameOver'
import s from './Game.module.css'

export const Game = () => {
    useCellSize()
    const isTurn = useSelector(state => state.game.isTurn)
    const isNewLevel = useSelector(state => state.game.isNewLevel)
    const isGameOver = useSelector(state => state.game.isGameOver)
    const isRestored = useSelector(state => state.game.isRestored)
    const isRestartMode = useSelector(state => state.game.isRestartMode)

    const dispatch = useDispatch()

    const overTurnHandler = () => {
        if(isTurn) {
            dispatch(overTurn())
        }
    }
    if( isGameOver) console.log('Game over')
    
    return (
        <>
        <div className={s.game} onPointerUp={overTurnHandler}>
            <Header />
            {isRestored ?
            <StartScreen/>
            :
            <GameField/>
            }
        </div>
        {isNewLevel && <NewLevel />}
        {isRestartMode && <Restart />}
        {isGameOver && <GameOver />}
        </>
    )
}