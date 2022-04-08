import { Component, OnInit } from '@angular/core';
import { Movie } from '../MovieClass';
import { Showing } from '../../showings/ShowingClass';
import { MatDialog } from '@angular/material/dialog';
import { AddMovieComponent } from '../add-movie/add-movie.component';
import { EditMovieComponent } from '../edit-movie/edit-movie.component';
import { DataService } from 'src/app/api/data.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movieList: Movie[] = [];
  showingList: Showing[] = [];
  selectedMovie: Movie | null  = null;

  constructor(public dialog: MatDialog, private data: DataService) {
  }

  ngOnInit() {
    this.data.getMovies().subscribe(list =>
      {
        this.movieList = list
        console.log(this.movieList)
      });

    this.data.getShowings().subscribe(list =>
      {
        this.showingList = list
        console.log(this.showingList)
      });
  }

  onClick(movie: Movie): void {
    this.selectedMovie = movie;
  }

  deleteMovie(id: number | undefined): void {
    if(id) {
      let search: Movie | undefined = this.movieList.find(e => e.id == id);
      if(search) {
        this.selectedMovie = search;
        this.data.deleteMovie(this.selectedMovie);
        console.log(this.selectedMovie);
      }
    }
  }

  openDialog(add: boolean, edit: boolean, id?: number | undefined): void {
    let dialogRef;
    console.log("opendialog")

    if (add) {
      console.log('opendialogadd')
      dialogRef = this.dialog.open(AddMovieComponent, {
        width: '30%',
        data: {}
      });
    }
    if (edit) {
      console.log('opendialogEDIT')
      let search: Movie | undefined = this.movieList.find(e => e.id == id);
      if(search) {
        this.selectedMovie = search;
      }
      dialogRef = this.dialog.open(EditMovieComponent, {
        width: '30%',
        data: { selectedMovie: this.selectedMovie }
      });
    }

    dialogRef?.afterClosed().subscribe(result => {
      if (result !== undefined) {
        let temp = result.value;

        if (add) {
          let newMovie = new Movie(
            temp.title,
            temp.length,
          );

          console.log("addShowing", newMovie);
          this.data.addMovie(newMovie);
          return;
        }

        if (edit) {
          this.movieList.forEach((obj, index, tab) => {
            if (obj === this.selectedMovie) {
              this.selectedMovie.title = temp.title;
              this.selectedMovie.length = temp.length;
              tab[index] = this.selectedMovie;
              this.data.editMovie(this.selectedMovie);
              this.selectedMovie = null;
              return
            }
          });
        }
      }
    });
  }

}
