import axios from 'axios'

const apiKey = 'b9bd48a6';
// const apiKey = process.env.REACT_APP_OMDB_API_KEY;
const dataBaseURL = `http://www.omdbapi.com/?apikey=${apiKey}`;

const api = axios.create({
  baseURL: dataBaseURL,
  responseType: 'json',
})

export default api
