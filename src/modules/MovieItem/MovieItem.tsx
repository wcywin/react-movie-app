import React from 'react'
import { Link } from 'react-router-dom'
import Svg from '../../components/Svg/Svg'
import getSlugFromTitle from '../../utils/getSlugFromTitle'
import { iconStar } from '../../assets/svg/svg'

import styles from './MovieItem.module.scss'

interface MovieItemProps {
  id: string,
  posterUrl: string,
  title: string,
  year: number,
}

const starsArray = [1, 2, 3, 4, 5];

const MovieItem: React.FC<MovieItemProps> = ({
  id,
  posterUrl,
  title,
  year,
}) => (
  <Link
    className={styles.root}
    to={`/movie/${id}/details/${getSlugFromTitle(title)}`}
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
