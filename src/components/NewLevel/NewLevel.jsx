import { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toNextLevel } from "../../Store/asyncAction"
import { Cell } from "../Cell/Cell"
import { ModalWindow } from "../ModalWindow/ModalWindow"
import s from "./NewLevel.module.css"

export const NewLevel = () => {
    const newLevelData = useSelector(state => state.game.newLevelData)
    const dispatch = useDispatch()
    const closeHandler = () => {
        dispatch(toNextLevel())
    }
    const elimenatedBlock = useMemo(() =>({
        value: newLevelData.removedValue
    }),[newLevelData])
    const newBlockAdded = useMemo(() =>({
        value: newLevelData.newValue
    }),[newLevelData])
    
    return (
        <ModalWindow>
                <div className={s.newLevelWindow}>
                    <div>NEW LEVEL</div>
                    <div>BLOCK ELIMINATED</div>
                    <Cell cell={elimenatedBlock}/>
                    <div>NEW BLOCK ADDED</div>
                    <Cell cell={newBlockAdded}/>
                    <button className="btn-big" onClick={closeHandler}>Ok</button>
                </div>
        </ModalWindow>
    )
}