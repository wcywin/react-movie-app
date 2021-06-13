import React from 'react'
import styles from './MovieList.module.scss'
import MovieItem from '../MovieItem/MovieItem'

interface MovieListProps {
  movies: object[]
}

const MovieList: React.FC<MovieListProps> = ({
  movies,
}) => {
  return (
    <div className={styles.root}>
      {movies.map(movie => {
        return (
          <MovieItem
            // @ts-ignore
            key={movie.imdbID}
            // @ts-ignore
            id={movie.imdbID}
            // @ts-ignore
            posterUrl={movie.Poster}
            // @ts-ignore
            title={movie.Title}
            // @ts-ignore
            year={movie.Year}
          />
        )
      })}
    </div>
  )
}

export default MovieList
