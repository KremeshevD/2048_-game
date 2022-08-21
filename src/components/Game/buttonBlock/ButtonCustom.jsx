export const ButtonCustom =  ({handler, content}) => {
    return (
        <div className="">
            <button className={content.class} onClick = {handler}>{content.text}</button>
            {content.cost && <span>{content.cost}</span>}
        </div>
    )
}