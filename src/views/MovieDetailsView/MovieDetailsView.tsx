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
import BaseButton from '../../components/Button/Button'
import TopBar from '../../modules/TopBar/TopBar'
import { MovieDetails } from '../../types'
import TypeHeader from '../../modules/TypeHeader/TypeHeader'

interface MovieDetailsViewDispatchProps {
  movieDetails: MovieDetails,
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
    window.scrollTo(0,0)
  }, [])

  useEffect(() => {
    if (id !== (movieDetails && movieDetails.imdbID)) {
      (async () => {
        // @ts-ignore
        setIsLoadingAction(true)
        await getMovieDetails(id)
          .then(({ data }) => setMovieDetailsAction(data))
          // @ts-ignore
          .finally(() => setIsLoadingAction(false))
      })()
    }
  }, [
    id,
    movieDetails,
    setIsLoadingAction,
    setMovieDetailsAction,
  ])

  return (
    <>
      {movieDetails && (
        <>
          <TopBar isMovieDetails />
          <div className={styles.root}>
            <div className={styles.topWrapper}>
              <div className={styles.details}>
                <div className={styles.year}>
                  {movieDetails.Year}, {movieDetails.Genre}
                </div>
                <div className={styles.stars}>
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
                  {movieDetails.Title}
                </div>
                <div className={styles.actors}>
                  {movieDetails.Actors}
                </div>
                <BaseButton>
                  Watch
                </BaseButton>
              </div>
              <div className={styles.posterContainer}>
                <img
                  className={styles.poster}
                  src={movieDetails.Poster}
                  alt={movieDetails.Title}
                />
              </div>
            </div>
            <TypeHeader title="Movie Details" />
            <div className={styles.plot}>
              {movieDetails.Plot}
            </div>
            <div className={styles.released}>
              Released: {movieDetails.Released}
            </div>
            <div className={styles.duration}>
              Duration: <span>{movieDetails.Runtime}</span>
            </div>
            <TypeHeader title="Awards" />
            <div className={styles.awards}>
              {movieDetails.Awards}
            </div>
            <div className={styles.ratings}>
              {movieDetails.Ratings.map(({ Value, Source }) => (
                <div className={styles.rating}>
                  <div className={styles.ratingValue}>
                    {Value}
                  </div>
                  <div className={styles.ratingSource}>
                    {Source}
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.footer}>
              {new Date().getFullYear()} Copyright &copy; Anastasiia Movies App
            </div>
          </div>
        </>
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
