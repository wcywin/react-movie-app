import { createSlice } from '@reduxjs/toolkit'
import initialState from './initialState'

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSearchedMovies(state, { payload }) {
      state.movies = payload
    },
    setLastSearchedQuery(state, { payload }) {
      state.query = payload
    },
    setTotalResults(state, { payload }) {
      state.totalResults = payload
    },
    setPageNumber(state, { payload }) {
      state.pageNumber = payload
    },
    setMovieDetails(state, { payload }) {
      state.movieDetails = payload
    },
  }
})

export const {
  setLastSearchedQuery,
  setMovieDetails,
  setPageNumber,
  setSearchedMovies,
  setTotalResults,
} = appSlice.actions

export default appSlice.reducer