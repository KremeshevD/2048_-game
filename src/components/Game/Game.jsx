import { useEffect, useRef, useState } from "react"
import useWindowDimensions from "../../Hooks/getWindowDimensions"
import { Cell } from "./Cell"
import { Game as GameClass } from '../../Utils/Game'
import './game.css'
import { PathSegment } from "./PathSegment"

export const Game = () => {
    let windowDimensions = useWindowDimensions()
    const cellH = Math.floor(windowDimensions.height/11.8)
    const cellW = Math.floor(windowDimensions.width/6.2)
    let cellSize = cellH > cellW ? cellW : cellH 
    const gameStyle = {
        width: cellSize*6.2,
        height: cellSize*11.4,
    }
    const fieldStyle = {
        width: cellSize*5.8,
        height: cellSize*9.4,
    }
    const gameFieldStyle = {
        width: cellSize*5.8
    }
    const lineStyle = {
        marginTop: cellSize*0.2,
        marginBottom: cellSize*0.2
    }
    let game = useRef(new GameClass(cellSize))
    let swapingCells = useRef([])
    let [pathSegments, setPathSegments] = useState(game.current.path.pathSegments)
    let [flatField, setFlatField] = useState(game.current.field.field.reduce((acc, line) => [...acc, ...line], []))
    const [isTurn, setIsTurn] = useState(false)
    const [isLevel, setIsLevel] = useState(false)
    const [daimonds, setDaimonds] = useState(game.current.daimonds)
    const [isRemoveMode, setIsRemoveMode] = useState(false)
    const [isSwapMode, setIsSwapMode] = useState(false)
    const [viseted, setVisited] = useState('')
    const [score, setScore] = useState(game.current.score)
    const [gameOver, setGameOver] = useState(game.current.gameOver)


    useEffect(()=> {
        if(isLevel) {
            setIsLevel(false)
            game.current.toNextLvl()
            setFlatField(game.current.field.field.reduce((acc, line) => [...acc, ...line], []))
            setTimeout(() => {
                game.current.field.update()
                setPathSegments([...game.current.path.pathSegments])
            }, 0)
        }
    }, [isLevel])
   
    const click = (e) => {
        setIsTurn(true)
        game.current.startTurn(e)
    }
    const move = (e) => {
        e.preventDefault()
            if(isTurn) {
                game.current.turnInProgress(e)
                setPathSegments([...game.current.path.pathSegments])
                setVisited(game.current.path.pathPoints[game.current.path.pathPoints.length-1])
            }
    }
    
    const end = (e) => {
        if(isTurn){
            setIsTurn(false)
            game.current.endTurn()
            setFlatField(game.current.field.field.reduce((acc, line) => [...acc, ...line], []))
            setPathSegments([...game.current.path.pathSegments])
            setDaimonds(game.current.daimonds)
            setVisited('')
            setScore(game.current.score)
            setGameOver(game.current.isGameOver)
            setTimeout(() => {
                game.current.field.update()
                setPathSegments([...game.current.path.pathSegments])
                let isNewLevel = game.current.isNewLevel()
                if (isNewLevel) {
                    setIsLevel(true)
                }
            }, 0)
        }
    }

    const removeCell = (e) => {
        e.stopPropagation()
        if(isRemoveMode) {
            setIsRemoveMode(false)
            game.current.destroyCell(e)
            setFlatField(game.current.field.field.reduce((acc, line) => [...acc, ...line], []))
            setTimeout(() => {
                game.current.field.update()
                setPathSegments([...game.current.path.pathSegments])
            }, 0)
        }
        if (isSwapMode) {
            swapingCells.current.push(e)
            if(swapingCells.current.length === 2 ){
                game.current.swapCells(swapingCells.current)
                setFlatField(game.current.field.field.reduce((acc, line) => [...acc, ...line], []))
                setIsSwapMode(false)
                swapingCells.current = []
            }
        }
    }

    const restart = () => {
        game.current.restart()
        setFlatField(game.current.field.field.reduce((acc, line) => [...acc, ...line], []))
        setDaimonds(game.current.daimonds)
        setScore(game.current.score)
    }


    return (
        <div className="game" style={gameStyle} onPointerUp={end}>
            <div className="navBar">
                <div>Daimond: {daimonds}</div>
                <div>Best Score: {score}</div>
            </div>
            <div className="gameField" style={gameFieldStyle}   onPointerMove={ move} onPointerUp={end}>
                <div className="score">{score}</div>
                <hr style={lineStyle}></hr>
                <div className="field" style={fieldStyle}>
                    {flatField.map(cell => <Cell 
                        cell={cell} 
                        top={cell.top}
                        key={cell.id} 
                        visited = {viseted}
                        onPointerDown={click}
                        onClick = {removeCell}
                        className="cell"
                        /> )}
                    {
                        pathSegments.length && pathSegments.map(item => <PathSegment pathSegment={item} key={item.id}/>)
                    }
                </div>
                <hr style={lineStyle}></hr>
                <div className="buttonBlock">
                    <div onClick={()=> setIsSwapMode(!isRemoveMode)}>Swap</div>
                    <div onClick={()=> setIsRemoveMode(!isRemoveMode)}>Remove</div>
                    <div onClick={restart}>Restart</div>
                </div>
            </div>
        </div>
    )
}