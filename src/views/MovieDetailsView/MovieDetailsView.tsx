import React, { Dispatch, useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setMovieDetails } from '../../store/reducers/appSlice/appSlice'
import { setIsLoading } from '../../store/reducers/commonSlice/commonSlice'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import getMovieDetails from '../../utils/getMovieDetails'

import styles from './MovieDetailsView.module.scss'
import Svg from '../../components/Svg/Svg'
import { iconStar } from '../../assets/svg/svg'
import BaseButton from '../../components/Button/BaseButton'

interface MovieDetailsViewDispatchProps {
  movieDetails: object,
  setIsLoadingAction: Dispatch<ActionCreatorWithPayload<boolean>>,
  setMovieDetailsAction: Dispatch<ActionCreatorWithPayload<object>>,
}

const starsArray = [1, 2, 3, 4, 5];

const MovieDetailsView: React.FC<MovieDetailsViewDispatchProps> = ({
  movieDetails,
  setIsLoadingAction,
  setMovieDetailsAction,
}) => {
  // @ts-ignore
  const { id } = useParams()

  useEffect(() => {
    (async () => {
      // @ts-ignore
      setIsLoadingAction(true)
      await getMovieDetails(id)
        .then(({ data }) => setMovieDetailsAction(data))
        // @ts-ignore
        .finally(() => setIsLoadingAction(false))
    })()
  }, [
    id,
    setIsLoadingAction,
    setMovieDetailsAction,
  ])

  return (
    <>
      {movieDetails && (
        <div className={styles.root}>
          <div className={styles.topWrapper}>
            <div className={styles.details}>
              <div className={styles.year}>
                {/*// @ts-ignore*/}
                {movieDetails.Year}
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
                {/*// @ts-ignore*/}
                {movieDetails.Title}
              </div>
              <div className={styles.actors}>
                {/*// @ts-ignore*/}
                {movieDetails.Actors}
              </div>
              <BaseButton>
                Oglądaj
              </BaseButton>
            </div>
            <div className={styles.posterContainer}>
              <img
                className={styles.poster}
                // @ts-ignore
                src={movieDetails.Poster}
                // @ts-ignore
                alt={movieDetails.Title}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const mapStateToProps = ({
  // @ts-ignore
  app,
}) => ({
  movieDetails: app.movieDetails
})

const mapsDispatchToProps = {
  setIsLoadingAction: setIsLoading,
  setMovieDetailsAction: setMovieDetails,
}

export default connect(mapStateToProps, mapsDispatchToProps)(MovieDetailsView)
