import { getValueForDisplay } from '../../Utils/getValueForDisplay';

export const Cell = ({ cell, onPointerDown, top, onClick, isSwaping, maxValueOnField }) => {
  let isMax = cell.value > 7 && maxValueOnField === cell.value;
  let style = {
    top: top,
    width: cell.size,
    left: cell.left,
    height: cell.size,
    backgroundColor: cell.color,
  };
  let classes = 'cell';
  classes += cell.isVisited ? ' pick' : '';
  classes += isSwaping ? ' swapingCell' : '';
  classes += cell.isUnited ? ' unite' : '';
  classes += cell.isDeleted ? ' deletedCell' : '';
  classes += isMax ? ' maxValue' : '';

  const value = getValueForDisplay(cell.value);

  return (
    <div
      className={classes}
      style={style}
      onPointerDown={onPointerDown}
      onClick={onClick}
      data-xy={cell.xy}
      id={cell.id}>
      {value}
    </div>
  );
};
