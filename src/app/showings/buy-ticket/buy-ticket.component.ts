import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Showing } from '../ShowingClass';

@Component({
  selector: 'app-buy-ticket',
  templateUrl: './buy-ticket.component.html',
  styleUrls: ['./buy-ticket.component.css']
})
export class BuyTicketComponent implements OnInit {
  seatsAvailable: number [] = [];

  constructor(public dialogRef: MatDialogRef<BuyTicketComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {form: NgForm, showing: Showing}) { }


  ngOnInit(): void {
    console.log('data',this.data);
    let limit = this.data.showing.ticketsAvailable || 0;
    this.seatsAvailable

    for(let i=1; i<=limit; i++) {
      this.seatsAvailable.push(i);
    }
    this.seatsAvailable = this.seatsAvailable.filter(element => !this.data.showing.takenSeats.includes(element)); //remove takenSeats

    // this.roomSeats = [];

    // console.log(this.selectedShowing.roomId)
    // let allSeats = this.roomsList.find(e => e.id == this.selectedShowing.roomId)?.capacity;
    // console.log(allSeats);
    // for(let i=1; i<=allSeats!; i++)
    //   this.roomSeats.push(i);
    //   console.log(this.roomSeats);
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
