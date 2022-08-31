import s from './ModalWindow.module.css'
export const ModalWindow= (props) => {
    return (
        <div className={s.modal}>
            <div className={s.meassageBlock}>
                {props.children}
            </div>
        </div>
    )
}