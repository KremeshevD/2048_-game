import { useAnimatedCounter } from "../../Hooks/useAnimatedCounter";

export const Diamonds = ({ value }) => {
  const diamonds  = useAnimatedCounter(value, 3, 50)
  return (
    <div className="info">
      <div className="diamond" />
      <span>{diamonds}</span>
    </div>
  );
};
