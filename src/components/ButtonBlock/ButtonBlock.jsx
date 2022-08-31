import { useMemo } from 'react';
import s from './ButtonBlock.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { setDestroyMode, setRestartMode, setSwapMode } from '../../Store/gameReducer';
import { ButtonCustom } from '../ButtomCustom/ButtonCustom';

export const ButtonBlock = () => {
  const dispatch = useDispatch();
  const bonusCost = useSelector((state) => state.game.bonusCost);
  const diamonds = useSelector((state) => state.game.diamonds);
  const isSwapMode = useSelector((state) => state.game.isSwapMode);
  const isDestroyMode = useSelector((state) => state.game.isDestroyMode);
  const isRestartMode = useSelector((state) => state.game.isRestartMode);
  const swapButton = useMemo(() => {
    return {
      isOn: isSwapMode,
      style: 'swap',
      disabled: diamonds < bonusCost,
      cost: bonusCost,
      id: 1 + Date.now(),
      handler: () => {
        dispatch(setSwapMode());
      },
    };
  }, [bonusCost, diamonds, isSwapMode]);
  const removeButton = useMemo(() => {
    return {
      isOn: isDestroyMode,
      style: 'destroy',
      disabled: diamonds < bonusCost,
      cost: bonusCost,
      id: 10 + Date.now(),
      handler: () => {
        dispatch(setDestroyMode());
      },
    };
  }, [bonusCost, diamonds, isDestroyMode]);

  const restartButton = useMemo(() => {
    return {
      isOn: isRestartMode,
      style: 'restart',
      id: 20 + Date.now(),
      handler: () => {
        dispatch(setRestartMode());
      },
    };
  }, [isRestartMode]);
  let buttons = [swapButton, removeButton, restartButton];
  buttons = buttons.reduce((acc, item) => (item.isOn ? true : acc), false)
    ? buttons.filter((item) => item.isOn)
    : buttons;
  return (
    <div className={s.buttonBlock}>
      {buttons.map((button) => (
        <ButtonCustom {...button} key={button.id} />
      ))}
    </div>
  );
};
