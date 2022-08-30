import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { restartMode, startNewGame } from '../../Store/gameReducer';
import { Carousel } from './Carousel';
import { Diamonds } from './Diamonds';
import { ModalWindow } from './ModalWindow';

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
      <div className="restartWindow">
        <div className="restartWindowHeader">
          <Diamonds />
          <div className="exit" onClick={() => dispatch(restartMode())}>
            <span>X</span>
          </div>
        </div>
        <div className="column">
          <div>Start From</div>
          <Carousel list={blocks} onClick={pickHandler} />
          <button className="btn-big" onClick={btnHandler}>
            &#9654;
          </button>
        </div>
      </div>
    </ModalWindow>
  );
};
