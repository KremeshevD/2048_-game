import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { restartMode, setDestroyMode, setSwapMode } from '../../../Store/gameReducer';
import { ButtonCustom } from './ButtonCustom';

export const ButtonBlock = () => {
  const dispatch = useDispatch();
  const bonusCost = useSelector((state) => state.game.bonusCost);
  const diamonds = useSelector((state) => state.game.diamonds);

  const swapButton = useMemo(() => {
    return {
      style: 'swap',
      disabled: diamonds < bonusCost,
      cost: bonusCost,
      id: 1 + Date.now(),
      handler: () => {
        dispatch(setSwapMode());
      },
    };
  }, [bonusCost, diamonds]);
  const removeButton = useMemo(() => {
    return {
      style: 'destroy',
      disabled: diamonds < bonusCost,
      cost: bonusCost,
      id: 10 + Date.now(),
      handler: () => {
        dispatch(setDestroyMode());
      },
    };
  }, [bonusCost, diamonds]);

  const restartButton = useMemo(() => {
    return {
      style: 'restart',
      id: 20 + Date.now(),
      handler: () => {
        dispatch(restartMode())
      },
    };
  }, []);
  const buttons = [swapButton, removeButton, restartButton];
  return (
    <div className="buttonBlock">
      {buttons.map((button) => (
        <ButtonCustom {...button} key={button.id} />
      ))}
    </div>
  );
};
