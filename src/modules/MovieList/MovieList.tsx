import React from 'react'
import styles from './MovieList.module.scss'
import MovieItem from '../MovieItem/MovieItem'
import { Movie } from '../../types'

interface MovieListProps {
  movies: Movie[]
}

const MovieList: React.FC<MovieListProps> = ({
  movies,
}) => {
  return (
    <div className={styles.root}>
      {movies.map(movie => {
        return (
          <MovieItem
            key={movie.imdbID}
            id={movie.imdbID}
            posterUrl={movie.Poster}
            title={movie.Title}
            year={movie.Year}
          />
        )
      })}
    </div>
  )
}

export default MovieList
