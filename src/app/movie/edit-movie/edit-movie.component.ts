import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Movie } from '../MovieClass';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {
  @ViewChild('f') form!: NgForm;

  constructor(public dialogRef: MatDialogRef<EditMovieComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {selectedMovie: Movie, form: NgForm}) {}

  ngOnInit(): void {
    console.log('edit movie', this.data);

    setTimeout(() => {
      Promise.resolve().then(() => {
        this.form.control.patchValue({
          title: this.data.selectedMovie.title,
          length: this.data.selectedMovie.length,
        });
      });
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSend(form: NgForm){
    this.data.form = form.value;
    console.log(form, form.value);
    this.dialogRef.close(form);
  }
}
