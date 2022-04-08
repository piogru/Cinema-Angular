import { Movie } from './app/movie/MovieClass';

const movies: Movie[] = [];
let movie = new Movie('Movie1', 124);
movies.push(movie);
movie = new Movie('Movie2', 150);
movies.push(movie);

export const Movies = movies;
