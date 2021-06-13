import api from '../services/api'

const getMoviesWithQuery = (query: string, page: number = 1) => {
  return api.get('', {
    params: {
      s: query,
      type: 'movie',
      page,
    }
  })
}

export default getMoviesWithQuery
