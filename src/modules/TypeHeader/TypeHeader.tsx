import React from 'react'

import styles from './TypeHeader.module.scss'

const TypeHeader = () => {
  return (
    <div className={styles.root}>
      <div className={styles.title}>
        Your Movies
      </div>
      <div className={styles.subtitle}>
        Below you can find the movies that came back from your search
      </div>
    </div>
  )
}

export default TypeHeader
