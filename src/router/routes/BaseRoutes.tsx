import React from 'react'
import { Switch, Route } from 'react-router-dom'
import SearchView from '../../views/SearchView/SearchView'
import MovieDetailsView from '../../views/MovieDetailsView/MovieDetailsView'
import {URL_MAIN} from '../../contants/ulrs'

const BaseRoutes = () => (
  <Switch>
    <Route exact path={URL_MAIN.search} component={SearchView} />
    <Route exact path={URL_MAIN.movieDetails} component={MovieDetailsView} />
  </Switch>
)

export default BaseRoutes
