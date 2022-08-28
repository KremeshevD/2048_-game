import { useSelector } from "react-redux";
import { useAnimatedCounter } from "../../Hooks/useAnimatedCounter";

export const Header = () => {
    const diamonds = useSelector(state => state.game.diamonds)
    const score = useSelector(state => state.game.score)
    const diamondCounter = useAnimatedCounter(diamonds, 3, 50)

  return (
    <div className="navBar">
      <div className="diamondBlock"><div className="diamond"/>{diamondCounter}</div>
      <div>Best Score: {score}</div>
    </div>
  );
};
