import { useDispatch, useSelector } from 'react-redux';
import { turnInProgress } from '../../Store/gameReducer';
import { getPointerPosition } from '../../Utils/eventParser';
import { ButtonBlock } from '../ButtonBlock/ButtonBlock';
import { Field } from '../Field/Field';
import { Score } from '../Score/Score';
import s from './GameField.module.css'

export const GameField = () => {
  const score = useSelector((state) => state.game.score);
  const isTurn = useSelector((state) => state.game.isTurn);
  const dispatch = useDispatch();

  const moveHandler = (e) => {
    if (isTurn) {
      const pointerPosition = getPointerPosition(e);
      dispatch(turnInProgress(pointerPosition));
    }
  };
  return (
    <div className={s.gameField} onPointerMove={moveHandler}>
      <Score score={score} />
      <Field />
      <ButtonBlock />
    </div>
  );
};
