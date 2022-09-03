import { BonusPrice } from '../BonusPrice/BonusPrise';
import s from './ButtonCustom.module.css'

export const ButtonCustom = ({ text, handler, style, disabled, bonusPrice, isOn }) => {
  let classes = [s.bonusBtn, s[style], isOn ? s.cancel : '']
  return (
    <div className={s.bonus}>
      <button className={classes.join(' ')} onClick={handler} disabled={disabled}>
        {text}
      </button>
      {(bonusPrice && !isOn) && <BonusPrice price={bonusPrice} />}
    </div>
  );
};
