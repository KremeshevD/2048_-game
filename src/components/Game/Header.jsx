import { useSelector } from "react-redux";
import { getValueString } from "../../Utils/getValueForDisplay";
import { Diamonds } from "./Diamonds";

export const Header = () => {
    const diamonds = useSelector(state => state.game.diamonds)
    let score = useSelector(state => state.game.score)

  return (
    <div className="header">
      <Diamonds value={diamonds} />
      <div className="info">
        <div className="crown"/>
        <span>
         {score}
        </span>
      </div>
    </div>
  );
};
