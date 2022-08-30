import { COLORS } from '../../Game/config';
import { pow2StringNumber } from '../../Utils/getValueForDisplay';

export const Cell = ({ cell, onPointerDown, top, onClick, isSelected, maxValueOnField, isBig }) => {
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
  classes += isSelected ? ' selectedCell' : '';
  classes += cell.isUnited ? ' unite' : '';
  classes += cell.isDeleted ? ' deletedCell' : '';
  classes += isMax ? ' maxValue' : '';
  classes += isBig ? ' bigCell' : ''

  const value = pow2StringNumber(cell.value);

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
