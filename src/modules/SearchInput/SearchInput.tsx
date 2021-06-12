import React, {Dispatch, useState} from 'react'
import { connect } from 'react-redux'
import styles from './SearchInput.module.scss'
import { setIsLoading } from '../../store/reducers/commonSlice/commonSlice'
import { setSearchedMovies } from '../../store/reducers/appSlice/appSlice'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import getMovieWithQuery from '../../utils/getMovieWithQuery'
import Svg from '../../components/Svg/Svg'
import {iconSearch} from '../../assets/svg/svg'

interface SearchInputDispatchProps {
  setIsLoadingAction: Dispatch<ActionCreatorWithPayload<boolean>>,
  setSearchedMoviesAction: Dispatch<ActionCreatorWithPayload<object[]>>
}

const SearchInput: React.FC<SearchInputDispatchProps> = ({
  setIsLoadingAction,
  setSearchedMoviesAction,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log(searchTerm, 'searchTerm')
    // @ts-ignore
    setIsLoadingAction(true)
    await getMovieWithQuery(searchTerm)
      .then(({ data }) => {
        console.log(data.Search, 'data.Search');
        setSearchedMoviesAction(data.Search);
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

const mapsDispatchToProps = {
  setSearchedMoviesAction: setSearchedMovies,
  setIsLoadingAction: setIsLoading,
}

export default connect(null, mapsDispatchToProps)(SearchInput)
