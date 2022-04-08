import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Showing} from '../ShowingClass';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, NgForm} from '@angular/forms';
import { Room } from '../../room/RoomClass';
import { Movie } from '../../movie/MovieClass';

@Component({
  selector: 'app-edit-showing',
  templateUrl: './edit-showing.component.html',
  styleUrls: ['./edit-showing.component.css']
})
export class EditShowingComponent implements OnInit {
  @ViewChild('f') form!: NgForm;

  constructor(public dialogRef: MatDialogRef<EditShowingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {selectedShowing: Showing, form: NgForm, roomsList: Room[], moviesList: Movie[]}) {
  }

  ngOnInit(): void {
    console.log("edit init", this.data, this.form);

    setTimeout(() => {
      let temp = new Date(this.data.selectedShowing.date).toISOString();
      let valueDate = temp.substring(0, temp.length - 8);

      Promise.resolve().then(() => {
        this.form.control.patchValue({
          date: valueDate,
          movieId: this.data.selectedShowing.movieId,
          roomId: this.data.selectedShowing.roomId,
        });
      });
    });
  }
  onNoClick(): void{
    this.dialogRef.close();
  }
  onSend(form: NgForm){
    this.data.form = form.value;
    console.log(form, form.value);
    this.dialogRef.close(form);
  }
}
