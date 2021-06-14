export type Rating = {
  Source: string,
  Value: string,
}

export type MovieDetails = {
  Title: string,
  Year: string,
  imdbID: string,
  Type: string,
  Poster: string,
  Released: string,
  Runtime: string,
  Genre: string,
  Director: string,
  Writer: string,
  Actors: string,
  Plot: string,
  Language: string,
  Country: string,
  Awards: string,
  Ratings: Rating[],
  imdbRating: string,
}

export type Movie = {
  Title: string,
  Year: number,
  imdbID: string,
  Poster: string,
}
