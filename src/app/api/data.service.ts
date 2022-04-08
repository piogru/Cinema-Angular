import { Injectable } from '@angular/core';
import { Room } from '../room/RoomClass';
import { HttpClient } from '@angular/common/http';
import { RoomsService } from './rooms.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Movie } from '../movie/MovieClass';
import { Showing } from '../showings/ShowingClass';
import { MoviesService } from './movies.service';
import { ShowingsService } from './showings.service';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  moviesList: BehaviorSubject<Movie[]> = new BehaviorSubject<Movie[]>([]);
  roomsList: BehaviorSubject<Room[]> = new BehaviorSubject<Room[]>([]);
  showingsList: BehaviorSubject<Showing[]> = new BehaviorSubject<Showing[]>([]);

  // filteredShowings: Showing[];

  constructor(private rooms: RoomsService, private movies: MoviesService, private showings: ShowingsService) {
    this.rooms.getRooms().subscribe(list => {
      this.roomsList.next(list);
    });

    this.movies.getMovies().subscribe(list => {
      this.moviesList.next(list);
    });

    this.showings.getShowings().subscribe(list => {
      console.log('GET', list)
      this.showingsList.next(list);
    });
  }

  getRooms(): Observable<Room[]> {
    return this.roomsList;
  }

  getMovies(): Observable<Movie[]> {
    return this.moviesList;
  }

  getShowings(): Observable<Showing[]> {
    return this.showingsList;
  }

  addMovie(newMovie: Movie): void {
    this.movies.addMovie(newMovie).subscribe({
      next: (ret) => {
        let temp = this.moviesList.getValue();
        temp.push(ret);
        console.log("add movie", ret)
        this.moviesList.next(temp);
      },
      error: (error) => console.error(error),
    });
  }

  editMovie(editedMovie: Movie): void {
    this.movies.editMovie(editedMovie).subscribe({
      next: (ret) => {
        let temp = this.moviesList.getValue();
        let id = temp.findIndex(x => x.id == editedMovie.id)
        temp[id] = ret;
        this.moviesList.next(temp);
        console.log("Edit movie", ret);
      },
      error: (error) => console.error(error),
    });
  }

  deleteMovie(movie: Movie): void {
    this.movies.deleteMovie(movie).subscribe({
      next: (ret) => {
        let temp = this.moviesList.getValue();
        let id = temp.findIndex(x => x.id == movie.id)
        temp.splice(id, 1);
        this.moviesList.next(temp);
        console.log("Delete movie", ret);
      },
      error: (error) => console.error(error),
    });
  }

  //
  // SHOWINGS
  //

  addShowing(newShowing: Showing): void {
    this.showings.addShowing(newShowing).subscribe({
      next: (ret) => {
        let temp = this.showingsList.getValue();
        temp.push(ret);
        this.showingsList.next(temp)
        console.log("Add Showing", ret);
      },
      error: (error) => console.error(error),
    });
  }

  editShowing(showing: Showing): void {
    this.showings.editShowing(showing).subscribe({
      next: (ret) => {
        let temp = this.showingsList.getValue();
        let id = temp.findIndex(x => x.id == showing.id)
        temp[id] = ret;
        this.showingsList.next(temp);
        console.log("Edit Showing", ret);
      },
      error: (error) => console.error(error),
    });
  }

  deleteShowing(showing: Showing): void {
    this.showings.deleteShowing(showing).subscribe({
      next: (ret) => {
        let temp = this.showingsList.getValue();
        let id = temp.findIndex(x => x.id == showing.id)
        temp.splice(id, 1);
        this.showingsList.next(temp);
        console.log("Delete Showing", ret);
      },
      error: (error) => console.error(error),
    });
  }
}
