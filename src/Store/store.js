import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { gameSlice } from './gameReducer'

const reducer = combineReducers({
    game: gameSlice.reducer,
  });

export const store = configureStore({
  reducer
  }
)
