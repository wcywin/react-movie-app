import React from 'react'

import styles from './BaseButton.module.scss'

type BaseButtonProps = {
  color?: string
}

const BaseButton: React.FC<BaseButtonProps> = ({ color, children}) => {
  return (
    <div className={styles.root}>
      <div
        className={styles.button}
        style={{
          color,
        }}>
        {children}
      </div>
    </div>
  )
}

export default BaseButton
