import { useDispatch } from "react-redux"
import { toNextLevel } from "../../Store/asyncAction"

export const ModalWindow= ({newLevel}) => {
    const dispatch = useDispatch()
    const closeHandler = () => {
        dispatch(toNextLevel())
    }
    return (
        <div className="modal">
            <div className="meassageBlock">
                <div>New Block: {newLevel.newValue}</div>
                <div>Removed blocK: {newLevel.removedValue} </div>
                <button onClick={closeHandler}>Ok</button>
            </div>
        </div>
    )
}