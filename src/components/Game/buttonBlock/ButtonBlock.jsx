import { useDispatch } from "react-redux"
import { setDestroyMode, setSwapMode } from "../../../Store/gameReducer"
import { ButtonCustom } from "./ButtonCustom"


export const ButtonBlock = () => {
        const dispatch = useDispatch()
        const swapModeHandler = () => {
            dispatch(setSwapMode())
        }
        const removeModeHandler = () => {
            dispatch(setDestroyMode())
        }
        const restartHandler = () => {

        }
        const swapButton = {
            text: "Swap",
            class: "swap",
            cost: 100,
        }
        const removeButton = {
            text: "destroy",
            class: "destroy",
            cost: 100,
        }
        const restartButton = {
            text: "Restart",
            class: "restart",
        }
 return (
        <div className="buttonBlock">
                    <ButtonCustom handler={swapModeHandler} content = {swapButton}></ButtonCustom>
                    <ButtonCustom handler={removeModeHandler} content = {removeButton}></ButtonCustom>
                    <ButtonCustom handler={restartHandler} content = {restartButton}></ButtonCustom>

        </div>
    )
}