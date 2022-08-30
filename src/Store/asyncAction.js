import { createAsyncThunk } from "@reduxjs/toolkit"

export const overTurn = createAsyncThunk (
    'game/overTurn',
    async (_, {rejectWithValue, dispatch}) => {
        try { 
            const delay = new Promise((res, rej) => {
                setTimeout(() => {
                    dispatch(toNextStep())
                    res()
                }, 280)
            })
            await delay
            return 
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const toNextStep = createAsyncThunk(
    'game/toNextStep',
    async (_, {rejectWithValue}) => {
        try { 
            const delay = new Promise((res, rej) => {
                setTimeout(() => res(), 280)
            })
            await delay
            return 
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const toNextLevel = createAsyncThunk (
    'game/toNextLevel',
    async (_, {rejectWithValue, dispatch}) => {
        try { 
            const delay = new Promise((res, rej) => {
                setTimeout(() => {
                    dispatch(toNextStep())
                    res()
                }, 280)
            })
            await delay
            return 
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const destroyCell = createAsyncThunk (
    'game/destroyCell',
    async (cell, {rejectWithValue, dispatch}) => {
        try { 
            dispatch(pickCellForDestroy(cell))
            const delay = new Promise((res, rej) => {
                setTimeout(() => {
                    dispatch(toNextStep())
                    res()
            }, 280)
            })
            await delay
            return 
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const pickCellForDestroy = createAsyncThunk (
    'game/pickCellForDestroy',
    async (cell, { rejectWithValue }) => {
        try { 
            return cell
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)