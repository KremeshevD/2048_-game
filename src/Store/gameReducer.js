import { createSlice } from '@reduxjs/toolkit';
import { Game } from '../Game/Game';
import { destroyCell, overTurn, pickCellForDestroy, toNextLevel, toNextStep } from './asyncAction';

const game = new Game(5);
let savedGame = localStorage.getItem('game');

if (savedGame) {
  let cellSize = 5;
  savedGame = JSON.parse(savedGame);
  savedGame.cellSize = cellSize;
  game.restore(savedGame);
}
const initialState = {
  ...game.render(),
  isTurn: false,
  isSwapMode: false,
  isDestroyMode: false,
  isRestartMode: false,
  selectedCells: [],
  isRestored: savedGame ? true : false,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startTurn(state, { payload }) {
      game.startTurn(payload);
      const curGame = game.render();
      state.field = curGame.field;
      state.isTurn = true;
    },
    turnInProgress(state, { payload }) {
      game.turnInProgress(payload);
      const curGame = game.render();
      state.field = curGame.field;
      state.pathSegments = curGame.pathSegments;
    },
    setSwapMode(state) {
      state.isSwapMode = !state.isSwapMode;
      state.selectedCells = [];
      state.isGameOver = false;
    },
    setDestroyMode(state) {
      state.isDestroyMode = !state.isDestroyMode;
      state.isGameOver = false;
    },
    setSwapingCells(state, { payload }) {
      state.selectedCells = [...state.selectedCells, payload];
      if (state.selectedCells.length === 2) {
        state.isSwapMode = false;
        game.swapCells(state.selectedCells);
        state.selectedCells = [];
        const curGame = game.render();
        state.field = curGame.field;
      }
    },
    restoreGame(state) {
      state.isRestored = false;
      state.isGameOver = false;
    },
    setRestartMode(state) {
      state.isRestartMode = !state.isRestartMode;
      state.avalableBlocks = state.isRestartMode? game.generateCostStartBlock() : [];
    },
    startNewGame(state, { payload }) {
      game.restart(payload);
      let curGame = game.render();
      state.isTurn = false;
      state.isRestartMode = false;
      state.pathSegments = game.path.pathSegments;
      state.field = curGame.field;
      state.score = curGame.score;
      state.diamonds = curGame.diamonds;
      state.maxValueOnField = curGame.maxValueOnField;
      state.bonusCost = curGame.bonusCost;
      state.isDestroyMode = false;
      state.isSwapMode = false;
      localStorage.setItem('game', JSON.stringify(state));
    },
  },
  extraReducers: {
    [overTurn.pending]: (state) => {
      game.turnOver();
      const curGame = game.render();
      state.isTurn = false;
      state.pathSegments = game.path.pathSegments;
      state.field = curGame.field;
      state.score = curGame.score;
      state.diamonds = curGame.diamonds;
      state.maxValueOnField = curGame.maxValueOnField;
    },
    [overTurn.fulfilled]: (state) => {},
    [overTurn.rejected]: (state) => {
      state.isTurn = false;
    },
    [toNextStep.pending]: (state) => {
      game.dropDownCells();
      const curGame = game.render();
      state.field = curGame.field;
    },
    [toNextStep.fulfilled]: (state) => {
      game.synchronizeCellandField();
      const curGame = game.render();
      state.field = curGame.field;
      state.isNewLevel = curGame.isNewLevel;
      state.newLevelData = curGame.newLevelData;
      state.maxValue = game.maxValue;
      state.minValue = game.minValue;
      state.score = game.score;
      state.isGameOver = game.isGameOver;
      localStorage.setItem('game', JSON.stringify(state));
    },
    [toNextStep.rejected]: (state) => {},
    [toNextLevel.pending]: (state) => {
      game.toNextLvl();
      const curGame = game.render();
      state.field = curGame.field;
      state.isNewLevel = curGame.isNewLevel;
      state.newLevelData = curGame.newLevelData;
      state.bonusCost = curGame.bonusCost;
    },
    [toNextLevel.fulfilled]: (state) => {},
    [toNextLevel.rejected]: (state) => {
      state.isTurn = false;
    },
    [destroyCell.pending]: (state) => {
      state.isDestroyMode = false;
      state.diamonds = game.diamonds;
    },
    [destroyCell.fulfilled]: (state) => {},
    [destroyCell.rejected]: (state) => {
      state.isDestroyMode = false;
    },
    [pickCellForDestroy.fulfilled]: (state, { payload }) => {
      game.destroyCell(payload);
      const curGame = game.render();
      state.field = curGame.field;
      state.diamonds = curGame.diamonds;
    },
  },
});

export const {
  startTurn,
  turnInProgress,
  setSwapMode,
  setDestroyMode,
  setSwapingCells,
  restoreGame,
  setRestartMode,
  startNewGame,
} = gameSlice.actions;
