import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { restartMode, restoreGame } from '../../Store/gameReducer';
import { Cell } from './Cell';

export const StartScreen = () => {
  const dispatch = useDispatch();
  const higestBlock = useSelector((state) => state.game.maxValueOnField);
  const cell = {
    value: higestBlock,
  };
  const restartButton = useMemo(() => {
    return {
      style: 'restart',
      id: 20 + Date.now(),
      handler: () => {
        dispatch(restartMode());
      },
    };
  }, []);
  return (
    <div className="fullwide contentCenter fullheight">
      <div className="cellArea">
        <div className="circle">
          <Cell cell={cell} isBig={true} maxValueOnField={higestBlock}/>
        </div>
        <span>YOUR HIGEST BLOCK</span>
      </div>
      <button className="btn-big" onClick={() => dispatch(restoreGame())}>
        &#9654;
      </button>
     
    </div>
  );
};
