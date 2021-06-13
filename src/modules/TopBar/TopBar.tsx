import React from 'react'
import Logo from '../../components/Logo/Logo'
import SearchInput from '../SearchInput/SearchInput'

import styles from './TopBar.module.scss'

const TopBar = () => {
  return (
    <div className={styles.root}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.search}>
        {/*// @ts-ignore*/}
        <SearchInput />
      </div>
      <div className={styles.navLinks} />
    </div>
  )
}

export default TopBar
