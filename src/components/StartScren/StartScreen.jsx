import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRestartMode, restoreGame } from '../../Store/gameReducer';
import { Cell } from '../Cell/Cell';
import { Tutorial } from '../Tutorial/Tutorial';
import s from './StartScreen.module.css'

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
        dispatch(setRestartMode());
      },
    };
  }, []);

  return (
    <div className={s.container}>
      <div className={s.cellArea}>
        <div className={s.circle}>
          <Cell cell={cell} isBig={true} maxValueOnField={higestBlock}/>
        </div>
        <span>YOUR HIGEST BLOCK</span>
      </div>
      <button className={s.btn} onClick={() => dispatch(restoreGame())}>
        &#9654;
      </button>
      <Tutorial />
    </div>
  );
};
