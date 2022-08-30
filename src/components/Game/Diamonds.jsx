import { useSelector } from "react-redux";
import { useAnimatedCounter } from "../../Hooks/useAnimatedCounter";

export const Diamonds = () => {
  const diamondQty = useSelector(state => state.game.diamonds)
  const diamonds  = useAnimatedCounter(diamondQty, 3, 50)
  return (
    <div className="info">
      <div className="diamond" />
      <span>{diamonds}</span>
    </div>
  );
};
