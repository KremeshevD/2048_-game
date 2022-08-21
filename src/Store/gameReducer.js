import { createSlice } from '@reduxjs/toolkit';
import { Game } from '../Game/Game';
import getCellSize from '../Hooks/getCellSize';
import { destroyCell, overTurn, pickCellForDestroy, toNextLevel } from './asyncAction';

const game = new Game(getCellSize())
/* eslint-disable no-param-reassign */
export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    ...game.render(),
    isTurn: false,
    isSwapMode: false,
    isDestroyMode: false,
    swapingCells: []
  },
  reducers: {
    startTurn (state, {payload}) {
        game.startTurn(payload)
        const curGame = game.render()
        state.field = curGame.field
        state.isTurn = true  
    },
    turnInProgress (state, {payload}) {
            game.turnInProgress(payload)
            const curGame = game.render()
            state.field = curGame.field
            state.pathSegments = curGame.pathSegments
    },
    setSwapMode (state) {
      state.isSwapMode = true
    },
    setDestroyMode(state) {
      state.isDestroyMode = true
    },
    setSwapingCells(state, {payload}) {
      state.swapingCells = [...state.swapingCells, payload]
      if(state.swapingCells.length === 2) {
        state.isSwapMode = false
        game.swapCells(state.swapingCells)
        state.swapingCells = []
        const curGame = game.render()
        state.field = curGame.field
      }
    }
  },
  extraReducers: {
    [overTurn.pending]: (state) => {
        game.turnOver()
        const curGame = game.render()
        state.isTurn = false
        state.pathSegments = game.path.pathSegments
        state.field = curGame.field
      },
      [overTurn.fulfilled]: (state) => {
        game.toNextStep()
        const curGame = game.render()
        state.isNewLevel = curGame.isNewLevel
        state.field = curGame.field
        state.newLevelData = curGame.newLevelData
      },
      [overTurn.rejected]: (state) => {
        state.isTurn = false
      },
      [toNextLevel.pending]: (state) => {
        game.toNextLvl()
        const curGame = game.render()
        state.field = curGame.field
        state.isNewLevel = curGame.isNewLevel
        state.newLevelData = curGame.newLevelData
      },
      [toNextLevel.fulfilled]: (state) => {
        game.toNextStep()
        const curGame = game.render()
        state.field = curGame.field
      },
      [toNextLevel.rejected]: (state) => {
        state.isTurn = false
      },
      [destroyCell.pending]: (state) => {
        state.isDestroyMode = false
      },
      [destroyCell.fulfilled]: (state) => {
        game.toNextStep()
        const curGame = game.render()
        state.field = curGame.field
      },
      [destroyCell.rejected]: (state) => {
        state.isDestroyMode = false
      },
      [pickCellForDestroy.fulfilled]: (state, {payload}) => {
        game.destroyCell(payload)
        const curGame = game.render()
        state.field = curGame.field
      }
  }
});

export const { startTurn, turnInProgress, setSwapMode, setDestroyMode, setSwapingCells } = gameSlice.actions;
