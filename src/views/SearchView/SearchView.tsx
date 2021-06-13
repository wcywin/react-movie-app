import React, { Dispatch, useEffect } from 'react'
import { connect } from 'react-redux'
import MovieList from '../../modules/MovieList/MovieList'

import styles from './SearchView.module.scss'
import {
  ActionCreatorWithPayload,
} from '@reduxjs/toolkit'
import { setPageNumber, setSearchedMovies, setTotalResults } from '../../store/reducers/appSlice/appSlice'
import { setIsLoading } from '../../store/reducers/commonSlice/commonSlice'
import getMoviesWithQuery from '../../utils/getMoviesWithQuery'
import TopBar from '../../modules/TopBar/TopBar'
import TypeHeader from '../../modules/TypeHeader/TypeHeader'
import InfiniteScroll from 'react-infinite-scroll-component'
import GlobalLoader from '../../modules/GlobalLoader/GlobalLoader'

interface SearchViewProps {
  movies: object[],
  pageNumber: number,
  setIsLoadingAction: Dispatch<ActionCreatorWithPayload<boolean>>,
  setPageNumberAction: Dispatch<ActionCreatorWithPayload<number>>
  setSearchedMoviesAction: Dispatch<ActionCreatorWithPayload<object[]>>
  setTotalResultsAction: Dispatch<ActionCreatorWithPayload<object[]>>
  query: string,
  totalResults: number,
}

const SearchView: React.FC<SearchViewProps> = ({
  movies,
  pageNumber,
  setIsLoadingAction,
  setPageNumberAction,
  setSearchedMoviesAction,
  setTotalResultsAction,
  query,
  totalResults,
}) => {
  if (!movies && !totalResults) {
    // @ts-ignore
    setIsLoadingAction(true)
  }

  useEffect(() => {
    (async () => {
      // @ts-ignore
      setPageNumberAction(1)
      await getMoviesWithQuery(query, pageNumber)
        .then(({ data }) => {
          setTotalResultsAction(data.totalResults)
          setSearchedMoviesAction(data.Search)
        })
        .finally(() => {
          // @ts-ignore
          setPageNumberAction(pageNumber + 1)
          // @ts-ignore
          setIsLoadingAction(false)
        })})();
  }, [ // eslint-disable-line react-hooks/exhaustive-deps
    setIsLoadingAction,
    setPageNumberAction,
    setSearchedMoviesAction,
  ]);

  const fetchMoreData = () => {
    if (movies?.length < totalResults) {
      // @ts-ignore
      setPageNumberAction(pageNumber + 1)
    }
    getMoviesWithQuery(query, pageNumber)
      // @ts-ignore
      .then(({ data }) => setSearchedMoviesAction([...movies, ...data.Search]))
  }

  return (
    <>
      <TopBar />
      <div className={styles.root}>
        {movies ? (
          <>
            <TypeHeader />
            <InfiniteScroll
              dataLength={movies.length}
              next={fetchMoreData}
              hasMore={true}
              loader={<GlobalLoader />}
              endMessage={<h4>This is the end</h4>}
            >
              <MovieList movies={movies} />
            </InfiniteScroll>
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
  pageNumber: app.pageNumber,
  query: app.query,
  totalResults: app.totalResults,
})

const mapsDispatchToProps = {
  setPageNumberAction: setPageNumber,
  setSearchedMoviesAction: setSearchedMovies,
  setIsLoadingAction: setIsLoading,
  setTotalResultsAction: setTotalResults,
}

// @ts-ignore
export default connect(mapStateToProps, mapsDispatchToProps)(SearchView)
