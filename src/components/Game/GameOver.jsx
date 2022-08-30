import { ButtonBlock } from "./buttonBlock/ButtonBlock"
import { ModalWindow } from "./ModalWindow"

export const GameOver = () => {
       return (
        <ModalWindow>
                <div className="newLevelWindow">
                    <div>No more avalable moves</div>
                    <ButtonBlock></ButtonBlock>
                </div>
        </ModalWindow>
    )
}