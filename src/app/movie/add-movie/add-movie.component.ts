import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Movie } from '../MovieClass';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddMovieComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {form: NgForm}) { }

  ngOnInit(): void {
    console.log('data', this.data);
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
