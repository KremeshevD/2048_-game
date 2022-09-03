import { BASEBONUSPRICE, DIAMONDBONUSFORLENGTH, DIAMONDBONUSLEVEL } from './config';
import { Field } from './Field';
import { Path } from './Path';

export class Game {
  constructor(cellSize) {
    this.cellSize = cellSize;
    this.minValue = 1;
    this.maxValue = 7;
    this.field = new Field(cellSize, this.minValue, this.maxValue);
    this.maxValueOnField = this.maxValue;
    this.score = 0;
    this.diamonds = 0;
    this.path = new Path();
    this.newLevel = false;
    this.levelInfo = {};
    this.score = 0;
    this.isGameOver = false;
    this.isNewLevel = false;
    this.newLevelData = {};
    this.bonusPrice = BASEBONUSPRICE;
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
    const numberQty = this.maxValueOnField - this.minValue;
    if (value > this.maxValueOnField) {
      const dif = this.maxValueOnField - this.maxValue;
      
      let levelDiamonds = 0;
      this.maxValueOnField = value;
      if (this.maxValueOnField >= 9 && this.minValue === 1) {
        levelDiamonds = DIAMONDBONUSLEVEL;
        this.maxValue += 1;
        this.minValue += 1;
        this.diamonds += levelDiamonds;
        this.isNewLevel = true;
        this.bonusPrice += 15;
        this.newLevelData = {
          newValue: this.maxValue,
          removedValue: this.minValue - 1,
          newMaxValue: this.maxValueOnField,
          diamonds: levelDiamonds,
        };
        this.isNewLevel = true;
      } else if (this.maxValueOnField >= 14 && this.minValue === 2) {
        levelDiamonds = DIAMONDBONUSLEVEL + this.maxValue - 6;
        this.maxValue += 1;
        this.minValue += 1;
        this.diamonds += levelDiamonds;
        this.isNewLevel = true;
        this.bonusPrice += 15;
        this.newLevelData = {
          newValue: this.maxValue,
          removedValue: this.minValue - 1,
          newMaxValue: this.maxValueOnField,
          diamonds: levelDiamonds,
        };
      } else if (this.maxValueOnField >= 17 && numberQty >= 14) {
        levelDiamonds = (DIAMONDBONUSLEVEL + this.maxValue - 6) * dif;
        this.maxValue += dif;
        this.minValue += dif;
        this.diamonds += levelDiamonds;
        this.bonusPrice += 15;
        this.isNewLevel = true;
        this.newLevelData = {
          newValue: this.maxValue,
          removedValue: this.minValue - 1,
          newMaxValue: this.maxValueOnField,
          diamonds: levelDiamonds,
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
        isSelected: true,
        id: price + Date.now(),
      },
    ];
    price = 500;
    while (price < this.diamonds) {
      if (i === 0) {
        priceList.push({
          value: 20,
          price,
          isSelected: false,
          id: price + Date.now(),
        });
      } else {
        price = 1000 + (i - 1 + Math.floor(i / 5)) * 100;
        priceList.push({
          value: 20 + i,
          price,
          isSelected: false,
          id: price + Date.now(),
        });
      }
      i++;
      price = 1000 + (i - 1 + Math.floor(i / 5)) * 100;
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
      let price = 1000 + (value - 21) * 100;
      if (this.diamonds > price) {
        this.diamonds -= price;
        res = true;
      }
    }
    return res;
  }
  restart(startValue = 1) {
    startValue = parseInt(startValue);
    if (this.#isStartBlockAvalaible(startValue)) {
      this.minValue = startValue;
      this.maxValue = this.minValue + 6;
      this.field = new Field(this.cellSize, this.minValue, this.maxValue);
      this.maxValueOnField = this.maxValue;
      this.score = 0;
      this.path = new Path();
      this.newLevel = false;
      this.levelInfo = {};
      this.isGameOver = false;
      this.bonusPrice = 100 + 15 * (startValue - 1);
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
        this.diamonds += DIAMONDBONUSFORLENGTH;
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
    if (this.diamonds >= this.bonusPrice) {
      cell = this.field.getCell(cell.x, cell.y);
      this.diamonds -= this.bonusPrice;
      this.field.markForDeleting([cell]);
    }
  }
  swapCells([c1, c2]) {
    if (this.diamonds >= this.bonusPrice) {
      const cell1 = this.field.getCell(c1.x, c1.y);
      const cell2 = this.field.getCell(c2.x, c2.y);
      this.diamonds -= this.bonusPrice;
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
      bonusPrice: this.bonusPrice,
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
    this.bonusPrice = state.bonusPrice;
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
