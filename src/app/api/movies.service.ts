import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Movie } from '../movie/MovieClass';

interface IMovie {
  _title: string;
  _length: number;
  _id: number;
}

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private url = 'http://localhost:7777/movies/';

  getMovies(): Observable<Movie[]> {
    return this.http
      .get<IMovie[]>(this.url)
      .pipe(
        map(response => {
        let ret: Movie[] = response.map(movie => (new Movie(movie._title, movie._length, movie._id)));
        return ret;
      }))
      .pipe(catchError(this.handleError<Movie[]>('getMovies', [])));
  }

  addMovie(movie: Movie): Observable<Movie> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http
      .post<IMovie>(this.url, movie, httpOptions)
      .pipe(
        map(response => {
        return new Movie(response._title, response._length, response._id);
      }))
      .pipe(catchError(this.handleError<Movie>('addMovie')));
  }

  editMovie(movie: Movie): Observable<Movie> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    let url: string = this.url + movie.id;
    return this.http
      .put<IMovie>(url, movie, httpOptions)
      .pipe(
        map(response => {
        return new Movie(response._title, response._length, response._id);
      }))
      .pipe(catchError(this.handleError<Movie>('editMovie')));
  }

  deleteMovie(movie: Movie): Observable<Movie> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    let url: string = this.url + movie.id;
    console.log("delete id", movie.id)
    return this.http
      .delete<Movie>(url, httpOptions)
      .pipe(catchError(this.handleError<Movie>('deleteMovie')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation + ' failed' + error);
      return of(result as T);
    };
  }

  constructor(private http: HttpClient) {}
}
