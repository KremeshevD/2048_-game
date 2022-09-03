import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRestartMode, startNewGame } from '../../Store/gameReducer';
import { Carousel } from '../Carousel/Carousel';
import { Diamonds } from '../Diamonds/Diamonds';
import { ModalWindow } from '../ModalWindow/ModalWindow';
import s from './Restart.module.css'

export const Restart = () => {
  const [selectedBlock, setSelectedBlock] = useState(1);
  const avalableBlocks = useSelector((state) => state.game.avalableBlocks);
  const dispatch = useDispatch();
  let blocks = useMemo(() => {
    return avalableBlocks.map((item) => ({ ...item, isSelected: item.value === selectedBlock }));
  }, [avalableBlocks, selectedBlock]);

  const btnHandler = () => {
    dispatch(startNewGame(selectedBlock));
  };
  const pickHandler = (e) => {
    setSelectedBlock(parseInt(e.target.getAttribute('data-value')));
  };
  return (
    <ModalWindow>
      <div className={s.restartWindow}>
        <div className={s.restartWindowHeader}>
          <Diamonds />
          <div className={s.exit} onClick={() => dispatch(setRestartMode())}>
            <span>X</span>
          </div>
        </div>
        <div className={s.column}>
          <div>Start From</div>
          <Carousel list={blocks} onClick={pickHandler} />
          <button className={s.btnBig} onClick={btnHandler}>
            &#9654;
          </button>
        </div>
      </div>
    </ModalWindow>
  );
};
