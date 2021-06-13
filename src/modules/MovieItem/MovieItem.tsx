import React from 'react'
import { Link } from 'react-router-dom'

import styles from './MovieItem.module.scss'
import Svg from '../../components/Svg/Svg'

import { iconStar } from '../../assets/svg/svg'

interface MovieItemProps {
  id: string,
  posterUrl: string,
  title: string,
  year: number,
}

const starsArray = [1, 2, 3, 4, 5];

const createSlugFromTitle = (movieTitle: string) => movieTitle
  .toLowerCase()
  .replace(/[,.-]/g, '')
  .split(' ')
  .join('-')

const MovieItem: React.FC<MovieItemProps> = ({
  id,
  posterUrl,
  title,
  year,
}) => (
  <Link
    className={styles.root}
    to={`/movie/${id}/details/${createSlugFromTitle(title)}`}
  >
    <img
      className={styles.image}
      loading="lazy"
      src={posterUrl}
      alt={title}
    />
    <div className={styles.year}>
      {year}
    </div>
    <div className={styles.rating}>
      {starsArray.map(index => (
        <Svg
          key={index}
          icon={iconStar}
          size={1.6}
          svgClassName={styles.svg}
        />
      ))}
    </div>
    <div className={styles.title}>
      {title}
    </div>
  </Link>
)

export default MovieItem
