import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Showing } from '../showings/ShowingClass';
import { Movie } from './MovieClass';

@Injectable({
  providedIn: 'root'
})
export class MoviePopularityService {

  constructor() { }

  public getMoviePopularity(showingsList: Showing[], selectedMovie: Movie, selectedDate: Date): {labels: string[], ticketsCount: number[]} {
    // get data for chart
    const startDate = moment(selectedDate).subtract(3, 'day')
    const labels = []
    for (let i = 0; i < 7; i++) {
      labels.push(startDate.clone().add(i, 'day').format('YYYY-MM-DD'))
    }
    const ticketsCount = labels.map(label => {
      return this.countSoldTickets(showingsList, selectedMovie, label);
    });
    console.log("popularity", ticketsCount, labels);

    return {
      labels: labels,
      ticketsCount: ticketsCount,
    }
  }

  private countSoldTickets(showingsList: Showing[], selectedMovie: Movie, selectedDate: string, ): number {
    return showingsList.reduce((c, show) => {
      const showDate = moment(show.date).format('YYYY-MM-DD')
      // console.log("show", show, this.selectedMovie.id, this.selectedMovie?.id == show.movieId, showDate == selectedDate)
      return selectedMovie?.id === show.movieId && showDate === selectedDate ? c + show.ticketsSold : c
    }, 0)
  }
}
