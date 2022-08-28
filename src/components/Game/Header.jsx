import { useSelector } from "react-redux";
import { useAnimatedCounter } from "../../Hooks/useAnimatedCounter";

export const Header = () => {
    const diamonds = useSelector(state => state.game.diamonds)
    const score = useSelector(state => state.game.score)
    const diamondCounter = useAnimatedCounter(diamonds, 3, 50)

  return (
    <div className="navBar">
      <div className="info">
        <div className="diamond"/>
        <span>
          {diamondCounter}
        </span>
      </div>
      <div className="info">
        <div className="crown"/>
        <span>
         {score}
        </span>
      </div>
    </div>
  );
};
