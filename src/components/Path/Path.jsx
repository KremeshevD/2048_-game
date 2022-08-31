import { PathSegment } from "./PathSegment"

export const Path = ({path}) => {
    return (
        <>
            {path.map(item => <PathSegment pathSegment={item} key={item.id}/>)}
        </>
    )
}