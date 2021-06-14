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
import Loader from '../../components/Loader/Loader'
import Svg from '../../components/Svg/Svg'
import {iconSearch} from '../../assets/svg/svg'

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
    if (!movies || movies.length === 0) {
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
    }
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

  // @ts-ignore
  return (
    <>
      <TopBar />
      <div className={styles.root}>
        <TypeHeader
          title="Your Movies"
          subtitle="Below you can find the movies that came back from your search"
        />
        {movies ? (
          <>
            <InfiniteScroll
              dataLength={movies.length}
              next={fetchMoreData}
              hasMore={true}
              loader={<Loader />}
              endMessage={<h4>All movies have been loaded.</h4>}
            >
              {/*// @ts-ignore*/}
              <MovieList movies={movies} />
            </InfiniteScroll>
          </>
        ) : (
          <div className={styles.empty}>
            <Svg icon={iconSearch} size={5} svgClassName={styles.svg}/>
            <div>
              No movies found under this query. Try again with another one! :)
            </div>
          </div>
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

export default connect(mapStateToProps, mapsDispatchToProps)(SearchView)
