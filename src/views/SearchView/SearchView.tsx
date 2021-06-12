import React, {Dispatch, useEffect} from 'react'
import { connect } from 'react-redux'
import MovieList from '../../modules/MovieList/MovieList'

import styles from './SearchView.module.scss'
import {
  ActionCreatorWithPayload,
} from '@reduxjs/toolkit'
import { setSearchedMovies } from '../../store/reducers/appSlice/appSlice'
import { setIsLoading } from '../../store/reducers/commonSlice/commonSlice'
import getMovieWithQuery from '../../utils/getMovieWithQuery'
import TopBar from '../../modules/TopBar/TopBar'
import TypeHeader from '../../modules/TypeHeader/TypeHeader'

interface SearchViewProps {
  movies: object[],
  setIsLoadingAction: Dispatch<ActionCreatorWithPayload<boolean>>,
  setSearchedMoviesAction: Dispatch<ActionCreatorWithPayload<object[]>>
}

const SearchView: React.FC<SearchViewProps> = ({
  movies,
  setIsLoadingAction,
  setSearchedMoviesAction,
}) => {
  if (!movies) {
    // @ts-ignore
    setIsLoadingAction(true)
  }
  useEffect(() => {
    (async () => {
      await getMovieWithQuery('Love').then(({ data }) => {
        console.log(data.Search, 'data.Search');
        setSearchedMoviesAction(data.Search);
      })
        .finally(() =>  {
        // @ts-ignore
        setIsLoadingAction(false)
      })})();
  }, []);

  return (
    <>
      <TopBar />
      <div className={styles.root}>
        {movies ? (
          <>
            <TypeHeader />
            <MovieList movies={movies} />
          </>
        ) : (
          <div>No movies under this query. Try again!</div>
        )}
      </div>
    </>
  )
}

const mapStateToProps = ({
  // @ts-ignore
  app,
}) => ({
  movies: app.movies,
})

const mapsDispatchToProps = {
  setSearchedMoviesAction: setSearchedMovies,
  setIsLoadingAction: setIsLoading,
}

// @ts-ignore
export default connect(mapStateToProps, mapsDispatchToProps)(SearchView)
