import { useSelector } from "react-redux";
import { useAnimatedCounter } from "../../Hooks/useAnimatedCounter";
import s from './Diamonds.module.css'


export const Diamonds = () => {
  const diamondQty = useSelector(state => state.game.diamonds)
  const diamonds  = useAnimatedCounter(diamondQty, 3, 50)
  return (
    <div className={s.info}>
      <div className={s.diamond}/>
      <span>{diamonds}</span>
    </div>
  );
};
