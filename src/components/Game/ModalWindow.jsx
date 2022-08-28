
export const ModalWindow= (props) => {
    return (
        <div className="modal">
            <div className="meassageBlock">
                {props.children}
            </div>
        </div>
    )
}