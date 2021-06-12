import React from 'react'

import styles from './MovieItem.module.scss'
import Svg from '../../components/Svg/Svg'

import { iconStar } from '../../assets/svg/svg'

interface MovieItemProps {
  posterUrl: string,
  title: string,
  year: number,
}

const starsArray = [1, 2, 3, 4, 5];

const MovieItem: React.FC<MovieItemProps> = ({
  posterUrl,
  title,
  year,
}) => {
  return (
    <div
      className={styles.root}
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
    </div>
  )
}

export default MovieItem
