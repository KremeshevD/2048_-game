import { BonusPrice } from '../BonusPrice/BonusPrise';
import s from './ButtonCustom.module.css'

export const ButtonCustom = ({ text, handler, style, disabled, cost, isOn }) => {
  let classes = [s.bonusBtn, s[style], isOn ? s.cancel : '']
  return (
    <div className={s.bonus}>
      <button className={classes.join(' ')} onClick={handler} disabled={disabled}>
        {text}
      </button>
      {(cost && !isOn) && <BonusPrice price={cost} />}
    </div>
  );
};
