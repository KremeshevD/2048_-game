import { useSelector } from 'react-redux';
import { valueToStringNumber } from '../../Utils/getValueForDisplay';
import { Diamonds } from '../Diamonds/Diamonds';
import s from './Header.module.css';

export const Header = () => {
  const diamonds = useSelector((state) => state.game.diamonds);
  let recordScore = useSelector((state) => state.game.recordScore);
  recordScore = valueToStringNumber(recordScore, 6);

  return (
    <div className={s.header}>
      <Diamonds value={diamonds} />
      <div className={s.info}>
        <div className={s.crown} />
        <span>{recordScore}</span>
      </div>
    </div>
  );
};
