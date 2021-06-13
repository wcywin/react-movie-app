import api from '../services/api'

const getMovieDetails = (id: string) => {
  return api.get('', {
    params: {
      i: id,
      type: 'movie',
    }
  })
}

export default getMovieDetails
