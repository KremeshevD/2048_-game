import { getColor } from "../../Utils/getColor"
import { Cell } from "../Cell/Cell"
import { Path } from "../Path/Path"
import s from './Tutorial.module.css'

export const Tutorial = () => {
    const cells = [
        {
          value: 1
        },
        {
          value: 1
        },
        {
          value: 2
        },
        {
          value: 3
        }
      ]
      const pathSegments = [
        {
          ys: 2.25,
          length: 5,
          xs: 2.5,
          height: 0.5,
          color: getColor(1),
          angle: 0
        },
        {
          ys: 2.25,
          length: 5,
          xs: 7.5,
          height: 0.5,
          color: getColor(1),
          angle: 0
        },
        {
          ys: 2.25,
          length: 5,
          xs: 12.5,
          height: 0.5,
          color: getColor(2),
          angle: 0
        },
    ]

    return (
        <div className={s.tutorial}>
            {cells.map( item => <Cell  cell={item}/>)}
            <Path path={pathSegments}/>
        </div>
    )
}