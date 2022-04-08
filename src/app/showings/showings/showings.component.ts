import { Component, OnInit, } from '@angular/core';
import { Showing } from '../ShowingClass';
import { Room } from '../../room/RoomClass';
import { Movie } from '../../movie/MovieClass';
import {MatDialog} from '@angular/material/dialog';
import { AddShowingComponent } from '../add-showing/add-showing.component';
import { EditShowingComponent } from '../edit-showing/edit-showing.component';
import { DataService } from 'src/app/api/data.service';
import { BuyTicketComponent } from '../buy-ticket/buy-ticket.component';

@Component({
  selector: 'app-showings',
  templateUrl: './showings.component.html',
  styleUrls: ['./showings.component.css']
})
export class ShowingsComponent implements OnInit {
  showingsList: Showing[] = [];
  moviesList: Movie[] = [];
  roomsList: Room[] = [];

  constructor(public dialog: MatDialog, private data: DataService) {
  }

  ngOnInit(): void {
    this.data.getShowings().subscribe(list =>
      {
        this.showingsList = list;
        console.log("get", this.showingsList)
      });

    this.data.getMovies().subscribe(list =>
      {
        this.moviesList = list;
        console.log("get", this.moviesList)
      });

    this.data.getRooms().subscribe(list =>
      {
        this.roomsList = list;
        console.log("get", this.roomsList)
      });
  }

  getMovieTitle(id: number): string | undefined {
    let title: string | undefined = this.moviesList.find(element => element.id == id)?.title

    return title;
  }

  getAvailableTickets(ticketsAvailable: number | undefined, ticketsSold: number | undefined, roomId: number):  number {
    if(ticketsAvailable != undefined && ticketsSold != undefined && roomId) {
      let roomCapacity = this.roomsList.find(e => e.id == roomId)?.capacity;
      return ticketsAvailable = roomCapacity! - ticketsSold;
    }
    return 0;
  }

  deleteShowing(showing: Showing): void {
    this.data.deleteShowing(showing);
  }

  buyShowingTicket (showing: Showing, seat: number) {
    if(seat != -1) {
      if (showing) {
        showing.takenSeats.push(seat);
        showing.ticketsSold += 1;
        showing.ticketsAvailable = this.getAvailableTickets(showing.ticketsAvailable, showing.ticketsSold, showing.roomId);
        this.data.editShowing(showing);
      }
    }
  }

  openDialog(add: boolean, edit: boolean, buyTicket: boolean, showing: Showing | null): void {
    let dialogRef;
    console.log('opendialog')
    if (add) {
      console.log('opendialogadd')
      dialogRef = this.dialog.open(AddShowingComponent, {
        width: '30%',
        data: {
          roomsList: this.roomsList,
          moviesList: this.moviesList
        }
      });
    }
    if (edit) {
      console.log('opendialogEDIT')
      dialogRef = this.dialog.open(EditShowingComponent, {
        width: '30%',
        data: {
          selectedShowing: showing,
          roomsList: this.roomsList,
          moviesList: this.moviesList
        }
      });
    }
    if (buyTicket && showing) {
      console.log('opendialogEDIT')
      dialogRef = this.dialog.open(BuyTicketComponent, {
        width: '30%',
        data: {
          showing: showing,
        }
      });
    }

    dialogRef?.afterClosed().subscribe(result => {
      if (result !== undefined) {
        console.log(result)

        if (add) {
          let temp = result.value;

          let date = new Date(temp.date);
          var coeff = 1000 * 60 * 15;
          var rounded_date = new Date(Math.round(date.getTime() / coeff) * coeff);
          rounded_date.setHours(rounded_date.getHours() - rounded_date.getTimezoneOffset() / 60);

          let capacity = this.roomsList.find(e => e.id == temp.roomId)?.capacity;
          let newShowing = new Showing(
            temp.movieId,
            temp.roomId,
            rounded_date.toUTCString(),
            0,
            [],
            capacity
          );

          console.log("addShowing", newShowing);
          this.data.addShowing(newShowing);
          return;
        }

        console.log("edit bool", edit, showing)
        if (edit && showing) {
          let temp = result.value;

          let date = new Date(temp.date);
          var coeff = 1000 * 60 * 15;
          var rounded_date = new Date(Math.round(date.getTime() / coeff) * coeff);
          rounded_date.setHours(rounded_date.getHours() - rounded_date.getTimezoneOffset() / 60);

          let newCapacity = this.roomsList.find(e => e.id == temp.roomId)?.capacity;

          showing.movieId = temp.movieId;
          showing.roomId = temp.roomId;
          showing.ticketsAvailable = newCapacity;
          showing.date = rounded_date.toUTCString();

          this.showingsList.forEach((obj, index, tab) => {
            // console.log(obj, showing, obj === showing)
            if (obj === showing) {
              tab[index] = showing;
              this.data.editShowing(showing);
              return;
            }
          });
        }

        if (buyTicket && showing) {
          let temp = result.value;
          console.log("buy ticket",temp)

          showing.ticketsSold += 1;
          showing.takenSeats.push(temp.seat);

          this.data.editShowing(showing);
        }
      }
    });
  }

}
