import React from 'react'

import styles from './TypeHeader.module.scss'

interface TypeHeaderProps {
  title: string,
  subtitle?: string,
}

const TypeHeader: React.FC<TypeHeaderProps> = ({
  title,
  subtitle,
}) => {
  return (
    <div className={styles.root}>
      <div className={styles.title}>
        {title}
      </div>
      <div className={styles.subtitle}>
        {subtitle}
      </div>
    </div>
  )
}

export default TypeHeader
