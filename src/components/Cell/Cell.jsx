import { COLORS } from '../../Game/config';
import { pow2StringNumber } from '../../Utils/getValueForDisplay';
import s from './Cell.module.css'


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
  let classes = [s.cell];
  cell.isVisited && classes.push(s.pick);
  isSelected && classes.push(s.selectedCell)
  cell.isUnited && classes.push(s.unite)
  cell.isDeleted && classes.push(s.deletedCell)
  isMax && classes.push(s.maxValue)
  isBig && classes.push(s.bigCell)

  const value = pow2StringNumber(cell.value);

  return (
    <div
      className={classes.join(' ')}
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
