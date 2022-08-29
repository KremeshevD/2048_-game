import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startNewGame } from "../../Store/gameReducer"
import { Carousel } from "./Carousel"
import { ModalWindow } from "./ModalWindow"

export const Restart = () => {
    const [selectedBlock, setSelectedBlock] = useState(1)
    const dispatch = useDispatch()
    const btnHandler = () => {
        dispatch(startNewGame(selectedBlock))
    }
    const pickHandler = (e) => {
        setSelectedBlock(e.target.getAttribute('data-value'))
    }
    const avalableBlock = useSelector(state => state.game.avalableBlocks)
    return (
            <ModalWindow>
                <Carousel list={avalableBlock} onClick={pickHandler} />
                <button onClick={btnHandler}>Ok</button>
            </ModalWindow>
    )
}