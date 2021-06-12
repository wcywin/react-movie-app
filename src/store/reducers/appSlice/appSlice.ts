import { createSlice } from '@reduxjs/toolkit'
import initialState from './initialState'

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSearchedMovies(state, { payload }) {
      state.movies = payload
    }
  }
})

export const {
  setSearchedMovies,
} = appSlice.actions

export default appSlice.reducer