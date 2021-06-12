import api from '../services/api'

const getMovieWithQuery = (query: string, page: number = 1) => {
  return api.get('', {
    params: {
      s: query,
      type: 'movie',
      page,
    }
  })
}

export default getMovieWithQuery
