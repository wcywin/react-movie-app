import React from 'react'
import { connect } from 'react-redux'
import Loader from '../../components/Loader/Loader'
import styles from './GlobalLoader.module.scss'

interface GlobalLoaderProps {
  isLoading: boolean,
}

// @ts-ignore
const GlobalLoader: React.FC<GlobalLoaderProps> = ({
  isLoading,
}) => {
  if (!isLoading) {
    return false
  }

  return (
    <div className={styles.root}>
      <Loader size={5} />
    </div>
  )
}

const mapStateToProps = ({
  // @ts-ignore
  common,
}) => ({
  isLoading: common.isLoading,
})

export default connect(mapStateToProps)(GlobalLoader)
