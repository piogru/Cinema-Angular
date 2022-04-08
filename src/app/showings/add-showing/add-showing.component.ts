import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, NgForm} from '@angular/forms';
import { Showing } from '../ShowingClass';
import { Room } from '../../room/RoomClass';
import { Movie } from '../../movie/MovieClass';

@Component({
  selector: 'app-add-showing',
  templateUrl: './add-showing.component.html',
  styleUrls: ['./add-showing.component.css']
})
export class AddShowingComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddShowingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {form: NgForm, roomsList: Room[], moviesList: Movie[]}) { }

  ngOnInit(): void {
    // console.log('data',this.data);
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
