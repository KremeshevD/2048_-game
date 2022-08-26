import { useDispatch, useSelector } from "react-redux"
import { restoreGame } from "../../Store/gameReducer"

export const StartScreen = () => {
    const dispatch = useDispatch()
    const higestBlock = useSelector(state => state.game.maxValueOnField)

    return (

        <div className="fullwide contentCenter fullheight">
            <div>
                <div>
                    {higestBlock}
                </div>
                <span>YOUR HIGEST BLOCK</span>
            </div>
            <button className="big" onClick={() => dispatch(restoreGame())} >&#9654;</button>
        </div>
    )
}