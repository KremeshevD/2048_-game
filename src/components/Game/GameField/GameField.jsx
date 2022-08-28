import { useDispatch, useSelector } from 'react-redux';
import { turnInProgress } from '../../../Store/gameReducer';
import { getPointerPosition } from '../../../Utils/eventParser';
import { ButtonBlock } from '../buttonBlock/ButtonBlock';
import { Field } from '../Field';
import { Score } from '../Score/Score';

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
    <div className="gameField" onPointerMove={moveHandler}>
      <div className="score">
        <Score score={score} />
      </div>
      <hr />
      <Field />
      <hr />
      <ButtonBlock />
    </div>
  );
};
