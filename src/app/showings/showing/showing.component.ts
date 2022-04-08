import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Showing } from '../ShowingClass';
import {MatDialog} from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-showing',
  templateUrl: './showing.component.html',
  styleUrls: ['./showing.component.css']
})
export class ShowingComponent implements OnInit {
  @Input() showing: Showing = new Showing(-1, -1, new Date().toString());
  @Input() seats: number[] = [];
  @Input() availableTickets: number = -1;
  @Input() movieTitle: string | undefined = '';
  @Input() showButtons: boolean = true;
  // align="end"
  seat: number = 7;
  @Output() deleteShowing: EventEmitter<Showing> = new EventEmitter<Showing>();
  @Output() editShowing: EventEmitter<Showing> = new EventEmitter<Showing>();
  @Output() buyTicket: EventEmitter<number> = new EventEmitter<number>();

  editAmount = false;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  deleteSelectedShowing(): void{
    this.deleteShowing.emit();
  }
  editSelectedShowing(): void{
    this.editShowing.emit();
  }

  // selectChangeHandler (event: any) {
  //   //update the ui
  //   this.seat = event.target.value;
  // }

  buyShowing(): void {
    this.buyTicket.emit();
  }

}
