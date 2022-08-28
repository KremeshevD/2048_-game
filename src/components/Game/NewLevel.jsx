import { useDispatch, useSelector } from "react-redux"
import { toNextLevel } from "../../Store/asyncAction"
import { ModalWindow } from "./ModalWindow"

export const NewLevel = () => {
    const newLevelData = useSelector(state => state.game.newLevelData)
    const dispatch = useDispatch()
    const closeHandler = () => {
        dispatch(toNextLevel())
    }
    return (
        <ModalWindow>
                <div>New Block: {newLevelData.newValue}</div>
                <div>Removed blocK: {newLevelData.removedValue} </div>
                <button onClick={closeHandler}>Ok</button>
        </ModalWindow>
    )
}