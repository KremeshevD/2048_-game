import { createSlice } from '@reduxjs/toolkit';
import { Game } from '../Game/Game';
import getCellSize from '../Hooks/getCellSize';
import { destroyCell, overTurn, pickCellForDestroy, toNextLevel, toNextStep } from './asyncAction';


const game = new Game(getCellSize())
const savedGame = localStorage.getItem('game')
if(savedGame) {
  game.restore(JSON.parse(savedGame))
} 
const initialState = {
    ...game.render(),
    isTurn: false,
    isSwapMode: false,
    isDestroyMode: false,
    swapingCells: []
  }



export const gameSlice = createSlice({
  name: 'game',
  initialState,
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
        state.score = curGame.score
        state.diamonds = curGame.diamonds
        state.maxValueOnField = curGame.maxValueOnField
      },
      [overTurn.fulfilled]: (state) => {

      },
      [overTurn.rejected]: (state) => {
        state.isTurn = false
      },
      [toNextStep.pending]: (state) => {
        game.dropDownCells()
        const curGame = game.render()
        state.field = curGame.field
      },
      [toNextStep.fulfilled]: (state) => {
        game.synchronizeCellandField()
        const curGame = game.render()
        state.field = curGame.field
        state.isNewLevel = curGame.isNewLevel
        state.newLevelData = curGame.newLevelData
        state.maxValue = game.maxValue
        state.minValue = game.minValue
        state.score = game.score
        state.isGameOver = game.isGameOver
        localStorage.setItem('game', JSON.stringify(state))
      },
      [toNextStep.rejected]: (state) => {
        
      },
      [toNextLevel.pending]: (state) => {
        game.toNextLvl()
        const curGame = game.render()
        state.field = curGame.field
        state.isNewLevel = curGame.isNewLevel
        state.newLevelData = curGame.newLevelData
      },
      [toNextLevel.fulfilled]: (state) => {

      },
      [toNextLevel.rejected]: (state) => {
        state.isTurn = false
      },
      [destroyCell.pending]: (state) => {
        state.isDestroyMode = false
      },
      [destroyCell.fulfilled]: (state) => {
        
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
