import { COLORS } from '../../Game/config';
import { getValueForDisplay } from '../../Utils/getValueForDisplay';

export const Cell = ({ cell, onPointerDown, top, onClick, isSwaping, maxValueOnField, isBig }) => {
  let isMax = cell.value > 7 && maxValueOnField === cell.value;
  let style = cell.top !== undefined ? {
    top: top+'rem',
    left: cell.left+'rem',
    backgroundColor: cell.color,
    position: 'absolute'
  } : {
    backgroundColor: COLORS[cell.value%COLORS.length]
  };
  let classes = 'cell';
  classes += cell.isVisited ? ' pick' : '';
  classes += isSwaping ? ' swapingCell' : '';
  classes += cell.isUnited ? ' unite' : '';
  classes += cell.isDeleted ? ' deletedCell' : '';
  classes += isMax ? ' maxValue' : '';
  classes += isBig ? ' bigCell' : ''

  const value = getValueForDisplay(cell.value);

  return (
    <div
      className={classes}
      style={style}
      onPointerDown={onPointerDown}
      onClick={onClick}
      data-xy={cell.xy}
      data-value={cell.value}
      id={cell.id}>
      {value}
    </div>
  );
};
