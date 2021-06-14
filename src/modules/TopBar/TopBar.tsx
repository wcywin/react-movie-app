import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../components/Logo/Logo'
import SearchInput from '../SearchInput/SearchInput'

import styles from './TopBar.module.scss'
import Svg from '../../components/Svg/Svg'
import { iconChevron } from '../../assets/svg/svg'
import { URL_MAIN } from '../../contants/ulrs'

interface TobBarProps {
  isMovieDetails?: boolean,
}

const TopBar: React.FC<TobBarProps> = ({
  isMovieDetails,
}) => {
  return (
    <div className={styles.root}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.search}>
        {isMovieDetails ? (
          <Link
            className={styles.goBack}
            to={URL_MAIN.search}
          >
            <Svg icon={iconChevron} size={1.1} /> Go Back
          </Link>
        ) : (
          <SearchInput />
        )}
      </div>
      <div className={styles.navLinks} />
    </div>
  )
}

export default TopBar
