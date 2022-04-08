import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../MovieClass';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  @Input() movie: Movie = new Movie('', 0);
  @Output() deleteMovie: EventEmitter<void> = new EventEmitter();
  @Output() editMovie: EventEmitter<void> = new EventEmitter();
  @Output() showDetails: EventEmitter<void> = new EventEmitter();

  editAmount = false;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  deleteSelectedMovie(): void {
    this.deleteMovie.emit();
  }
  editSelectedMovie(): void {
    this.editMovie.emit();
  }
  showMovieDetails(): void {
    this.showDetails.emit();
  }
}
