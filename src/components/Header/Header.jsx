import { useSelector } from "react-redux";
import { valueToStringNumber } from "../../Utils/getValueForDisplay";
import { Diamonds } from "../Diamonds/Diamonds";
import s from './Header.module.css'

export const Header = () => {
    const diamonds = useSelector(state => state.game.diamonds)
    let score = useSelector(state => state.game.score)
    score = valueToStringNumber(score, 6)

  return (
    <div className={s.header}>
      <Diamonds value={diamonds} />
      <div className={s.info}>
        <div className={s.crown}/>
        <span>
         {score}
        </span>
      </div>
    </div>
  );
};
