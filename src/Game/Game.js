import { Field } from './field';
import { Path } from './Path';

const diamondBonusForLength = 3;

export class Game {
  constructor(cellSize) {
    this.cellSize = cellSize;
    this.minValue = 1;
    this.maxValue = 8;
    this.field = new Field(cellSize, this.minValue, this.maxValue);
    this.maxValueOnField = 8;
    this.score = 0;
    this.diamonds = 0;
    this.path = new Path();
    this.newLevel = false;
    this.levelInfo = {};
    this.score = 0;
    this.isGameOver = false;
    this.isNewLevel = false;
    this.newLevelData = {};
    this.bonusCost = 100;
  }

  #getNewValue(value) {
    return Math.ceil(Math.log(value) / Math.log(2));
  }
  #getTurnScore(cellList) {
    return cellList.reduce((acc, cell) => {
      return (acc += Math.pow(2, cell.value));
    }, 0);
  }
  #isMoveCorrect(cell) {
    if (cell) {
      cell = this.field.getCell(cell.x, cell.y);
      const isVisited = this.path.isVisited(cell);
      const prevPoint = this.path.getLastPathPoint();
      const isNeighbors = this.field.isNeighbors(prevPoint, cell);
      const isValueCorrect =
        cell.value === prevPoint.value ||
        (this.path.pathSegments.length > 1 && cell.value === prevPoint.value + 1);
      if (!isVisited && isNeighbors && isValueCorrect) {
        return cell;
      }
    }
    return false;
  }
  #isNewLevel(value) {
    if (value > this.maxValueOnField) {
      const dif = this.minValue - this.maxValueOnField;
      this.maxValueOnField = value;
      if (this.maxValueOnField >= 9 && this.maxValue === 8) {
        this.maxValue += 1;
        this.minValue += 1;
        this.diamonds += 30;
        this.isNewLevel = true;
        this.bonusCost += 15;
        this.newLevelData = {
          newValue: this.maxValue,
          removedValue: this.minValue - 1,
          newMaxValue: this.maxValueOnField,
        };
        this.isNewLevel = true;
      } else if (this.maxValueOnField >= 14 && this.maxValue === 9) {
        this.maxValue += 1;
        this.minValue += 1;
        this.diamonds += 30 + this.maxValue - 7;
        this.isNewLevel = true;
        this.bonusCost += 15;
        this.newLevelData = {
          newValue: this.maxValue,
          removedValue: this.minValue - 1,
          newMaxValue: this.maxValueOnField,
        };
      } else if (this.maxValueOnField >= 17) {
        this.maxValue += dif;
        this.minValue += dif;
        this.diamonds += 30 + this.maxValue - 7;
        this.bonusCost += 15;
        this.isNewLevel = true;
        this.newLevelData = {
          newValue: this.maxValue,
          removedValue: this.minValue - 1,
          newMaxValue: this.maxValueOnField,
        };
      }
    } else {
      this.newLevel = false;
    }
  }
  generateCostStartBlock() {
    let i = 0;
    let price = 0;
    let priceList = [
      {
        value: 1,
        price: 0,
        isSelected: true
      },
    ];
    price = 500;
    while (price < this.diamonds) {
      if (i === 0) {
        priceList.push({
          value: 20,
          price,
          isSelected: false
        });
      } else {
        price = 1000 + (i - 1) * 100;
        priceList.push({
          value: 20 + i,
          price,
          isSelected: false
        });
      }
      i++;
    }
    return priceList;
  }
  #isStartBlockAvalaible(value) {
    let res = false;
    if (value === 1) {
      res = true;
    } else if (value <= 20) {
      if (this.diamonds > 500) {
        this.diamonds -= 500;
        res = true;
      }
    } else if (value > 20) {
      console.log('nen');
      let cost = 1000 + (value - 21) * 100;
      if (this.diamonds > cost) {
        this.diamonds -= cost;
        res = true;
      }
    }
    return res;
  }
  restart(startValue = 1) {
    startValue = parseInt(startValue);
    if (this.#isStartBlockAvalaible(startValue)) {
      console.log(startValue);
      this.minValue = startValue;
      this.maxValue = this.minValue + 7;
      this.field = new Field(this.cellSize, this.minValue, this.maxValue);
      this.maxValueOnField = this.maxValue;
      this.score = 0;
      this.path = new Path();
      this.newLevel = false;
      this.levelInfo = {};
      this.isGameOver = false;
    }
  }
  toNextLvl() {
    this.field.setValueRange(this.minValue, this.maxValue);
    this.isNewLevel = false;
    this.newLevelData = {};
  }
  isNewLevel() {
    return this.newLevel;
  }
  startTurn(cell) {
    cell = this.field.getCell(cell.x, cell.y);
    this.path.addNewPoint(cell);
    cell.setVisited(true);
  }

  turnInProgress({ left, top, cell }) {
    if (true) {
      this.path.updateSearchLine(left, top);
      const isMoveCorrect = this.#isMoveCorrect(cell);
      if (isMoveCorrect) {
        cell = this.field.getCell(cell.x, cell.y);
        cell.setVisited(true);
        this.path.addNewPoint(cell);
      }
      if (cell) {
        cell = this.field.getCell(cell.x, cell.y);
        this.path.isRollBack(cell);
      }
    }
  }
  turnOver() {
    const visitedCells = this.path.getVisitedPoints();
    if (visitedCells.length > 1) {
      const turnScore = this.#getTurnScore(visitedCells);
      const newValue = this.#getNewValue(turnScore);
      this.score += turnScore;
      this.field.markForDeleting(visitedCells, newValue);
      this.#isNewLevel(newValue);
      if (visitedCells.length > 5) {
        this.diamonds += diamondBonusForLength;
      }
    }
    this.path.clearPath();
  }
  dropDownCells() {
    this.field.dropDown();
  }
  synchronizeCellandField() {
    this.field.update();
    this.isGameOver = !this.field.isAnyMoveAvalable();
  }
  destroyCell(cell) {
    if (this.diamonds >= this.bonusCost) {
      cell = this.field.getCell(cell.x, cell.y);
      this.diamonds -= this.bonusCost;
      this.field.markForDeleting([cell]);
    }
  }
  swapCells([c1, c2]) {
    if (this.diamonds >= this.bonusCost) {
      const cell1 = this.field.getCell(c1.x, c1.y);
      const cell2 = this.field.getCell(c2.x, c2.y);
      this.diamonds -= this.bonusCost;
      this.field.swapCells(cell1, cell2);
    }
  }
  render() {
    return {
      diamonds: this.diamonds,
      cellSize: this.cellSize,
      minValue: this.minValue,
      maxValue: this.maxValue,
      score: this.score,
      maxValueOnField: this.maxValueOnField,
      isNewLevel: this.isNewLevel,
      isGameOver: this.isGameOver,
      newLevelData: this.newLevelData,
      bonusCost: this.bonusCost,
      ...this.path.render(),
      ...this.field.render(),
    };
  }
  restore(state) {
    this.field.restore({
      cells: state.field,
      minValue: state.minValue,
      maxValue: state.maxValue,
    });
    this.maxValueOnField = state.maxValueOnField;
    this.score = state.score;
    this.diamonds = state.diamonds;
    this.bonusCost = state.bonusCost;
    this.newLevel = false;
    this.levelInfo = {};
    this.score = state.score;
    this.isGameOver = false;
    this.isNewLevel = false;
    this.newLevelData = {};
    this.minValue = state.minValue;
    this.maxValue = state.maxValue;
  }
}
