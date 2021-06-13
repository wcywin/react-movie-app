import React, {Dispatch, useState} from 'react'
import { connect } from 'react-redux'
import styles from './SearchInput.module.scss'
import { setIsLoading } from '../../store/reducers/commonSlice/commonSlice'
import {
  setLastSearchedQuery,
  setPageNumber,
  setSearchedMovies,
  setTotalResults,
} from '../../store/reducers/appSlice/appSlice'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import getMoviesWithQuery from '../../utils/getMoviesWithQuery'
import Svg from '../../components/Svg/Svg'
import { iconSearch } from '../../assets/svg/svg'

interface SearchInputDispatchProps {
  pageNumber: number,
  setIsLoadingAction: Dispatch<ActionCreatorWithPayload<boolean>>,
  setLastSearchedQueryAction: Dispatch<ActionCreatorWithPayload<string>>,
  setPageNumberAction: Dispatch<ActionCreatorWithPayload<number>>
  setSearchedMoviesAction: Dispatch<ActionCreatorWithPayload<object[]>>
  setTotalResultsAction: Dispatch<ActionCreatorWithPayload<object[]>>
}

const SearchInput: React.FC<SearchInputDispatchProps> = ({
  pageNumber,
  setIsLoadingAction,
  setLastSearchedQueryAction,
  setPageNumberAction,
  setSearchedMoviesAction,
  setTotalResultsAction,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchTerm) {
      return
    }

    // @ts-ignore
    setIsLoadingAction(true)
    // @ts-ignore
    setLastSearchedQueryAction(searchTerm)
    // @ts-ignore
    setPageNumberAction(1)

    await getMoviesWithQuery(searchTerm, pageNumber)
      .then(({ data }) => {
        setSearchedMoviesAction(data.Search)
        setTotalResultsAction(data.totalResults)
      })
      .finally(() =>  {
        // @ts-ignore
        setIsLoadingAction(false)
        setSearchTerm('')
      })
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <form
      className={styles.root}
      onSubmit={onSubmit}
    >
      <Svg
        icon={iconSearch}
        size={1.3}
        svgClassName={styles.svg}
      />
      <input
        name="search"
        className={styles.input}
        type="text"
        value={searchTerm}
        onChange={onChange}
        placeholder="Search movies"
      />
    </form>
  )
}

const mapStateToProps = ({
  // @ts-ignore
  app,
}) => ({
  pageNumber: app.pageNumber,
})

const mapsDispatchToProps = {
  setIsLoadingAction: setIsLoading,
  setLastSearchedQueryAction: setLastSearchedQuery,
  setPageNumberAction: setPageNumber,
  setSearchedMoviesAction: setSearchedMovies,
  setTotalResultsAction: setTotalResults,
}

export default connect(mapStateToProps, mapsDispatchToProps)(SearchInput)
