import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';
import { DataService } from '../api/data.service';
import { Movie } from '../movie/MovieClass';
import { Showing } from '../showings/ShowingClass';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  moviesList: Movie[] = [];
  showingsList: Showing[] = [];
  filteredShowings: Showing[] = [];
  today: string = new Date().toISOString();
  date: Date= new Date();
  dateString: String = '';
  dateControl: FormControl = new FormControl(new Date());

  constructor(private data: DataService) {
  }

  ngOnInit(): void {
    this.data.getShowings().subscribe(list => {
      this.showingsList = list;
      console.log("get", this.showingsList)

      this.filteredShowings = this.getShowingsByDate(new Date());
      this.filteredShowings.sort(this.timeSort);
    });

    this.data.getMovies().subscribe(list => {
      this.moviesList = list;
      console.log("get", this.moviesList)
    });

    let temp = new Date().toISOString();
    let today = temp.substring(0, temp.length - 8);

    this.today = today;

    this.dateString = new Date().toUTCString();

    Promise.resolve().then(() => {
      this.dateControl.patchValue(today);
    });

  }

  getMovieTitle(id: number): string | undefined {
    let title: string | undefined = this.moviesList.find(element => element.id == id)?.title

    return title;
  }

  getAvailableTickets(ticketsAvailable: number | undefined, ticketsSold: number | undefined):  number {
    if(ticketsAvailable != undefined && ticketsSold != undefined) {
      return ticketsAvailable - ticketsSold;
    }
    return 0;
  }

  isToday(showing: Showing, index: number, array: Showing[]) {
    console.log("hey",this)
    let showingDate = moment(showing.date).format('YYYY-MM-DD');
    let date =  moment(this.date).format('YYYY-MM-DD');

    if(showingDate === date) {
      return true;
    }

    return false;
  }

  getShowingsByDate(date: Date): Showing[] {
    let temp: Showing[] = [];

    temp = this.showingsList.filter((showing) => {
      let showingDate = moment(showing.date).format('YYYY-MM-DD');
      let date =  moment(this.date).format('YYYY-MM-DD');

      console.log(showingDate === date && new Date(showing.date).getTime() > this.date.getTime())
      if(showingDate === date && new Date(showing.date).getTime() > this.date.getTime()) {
        return true;
      }

      return false;
    });``

    return temp;
  }

  selectDate(event: Event): void{
    let value = (event.target as HTMLInputElement).value;
    // console.log(e.target.value);
    if(value){
      console.log(value);
      this.date = new Date(value);
      this.filteredShowings = this.getShowingsByDate(this.date);
      this.dateString = this.date.toUTCString();
      this.filteredShowings.sort(this.timeSort);
    }
  }

  timeSort(a: Showing, b:Showing): number{
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  }
  // array.sort((a,b)=>a.getTime()-b.getTime());
}
