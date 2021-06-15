import mockAxios from 'axios'
import getMovieDetails from './getMovieDetails'

jest.mock('axios')

const mockedMovieDetails = {
  Title: '100% Love',
  Year: '2011',
  Rated: 'N/A',
  Released: '06 May 2011',
  Runtime: '141 min',
  Genre: 'Comedy, Drama, Romance',
  Director: 'Sukumar',
  Writer: 'Sukumar (story), Chandrasekhar T. Ramesh (dialogue), Hari Prasad Jakka (screenplay)',
  Actors: 'Naga Chaitanya Akkineni, Tamannaah Bhatia, Tara Alisha, K.R. Vijaya',
  Plot: 'When his cousin Mahalakshmi comes to stay, Balu is challenged to an extent rare in his charmed life. Will Balu let himself be seduced by Mahalakshmis bubbly spirit and sharp brain, or will his ego prove an insurmountable barrier?',
  Language: 'Telugu',
  Country: 'India',
  Awards: '1 win & 7 nominations.',
  Poster: 'https://m.media-amazon.com/images/M/MV5BZGQ5YTY1MzItMmQ2ZS00Y2I4LTk1ODEtZjNmODlhYWIwMTJlXkEyXkFqcGdeQXVyNjkwOTg4MTA@._V1_SX300.jpg',
  Metascore: 'N/A',
  imdbRating: '7.0',
  imdbVotes: '2,594',
  imdbID: 'tt1869226',
  Type: 'movie',
  DVD: 'N/A',
  BoxOffice: 'N/A',
  Production: 'N/A',
  Website: 'N/A',
  Response: 'True',
}

test('fetches successfully movie details data with get method based on movie id from omdb API', async () => {
  mockAxios.get.mockImplementationOnce(() => Promise.resolve(mockedMovieDetails))

  await expect(getMovieDetails('tt1869226')).resolves.toEqual(mockedMovieDetails)
})
