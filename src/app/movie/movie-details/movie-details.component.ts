import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Movie } from '../MovieClass';
import { Showing } from '../../showings/ShowingClass';

import { ChartModule } from 'angular2-chartjs';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import * as moment from 'moment';
import { MoviePopularityService } from '../movie-popularity.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/api/data.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  selectedDate: Date = new Date();
  showingsList: Showing[] = [];
  dateControl: FormControl = new FormControl(new Date());
  selectedMovie: Movie = new Movie('', -1);

  selectedMovieId: number = -1;

  BLUE: string = 'rgba(54, 162, 235, 0.2)'
  PURPLE: string = '#79018C'

  type = 'bar';
  chartData = { };
  options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Sprzedane bilety',
      },
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          stepSize: 1,
        }
      }],
    },
  };

  constructor(
    private moviePopularity: MoviePopularityService,
    private route: ActivatedRoute,
    private dataService: DataService) {}

  ngOnInit(): void {
    let idString: string | null = null;
    this.route.paramMap.subscribe(params => {
      idString = params.get('id')
      console.log(params)
    });

    if(idString) {
      this.selectedMovieId = parseInt(idString);
    }

    this.dataService.getMovies().subscribe(list => {
      let movie: Movie | undefined = list.find(e => e.id == this.selectedMovieId);
      console.log("wakaliwood", movie, list, this.selectedMovieId);
      if(movie){
        this.selectedMovie = movie;

        this.dataService.getShowings().subscribe(list => {
          this.showingsList = list;
          console.log("get", this.showingsList)

          setTimeout(() => {
            Promise.resolve().then(() => {
              this.dateControl.setValue(this.selectedDate.toISOString().substring(0,10));

              let popularity = this.moviePopularity.getMoviePopularity(this.showingsList, this.selectedMovie, this.selectedDate);
              this.chartData = {
                labels: popularity.labels,
                datasets: [
                  {
                    label: 'sprzedane bilety',
                    data: popularity.ticketsCount,
                    backgroundColor: [this.BLUE, this.BLUE, this.BLUE, this.PURPLE, this.BLUE, this.BLUE, this.BLUE],
                  }
                ],
              }
            });
          });
        });
      }
    });
  }

  selectDate(e:MatDatepickerInputEvent<Date>): void{
    if(e.value){
      console.log(e.value)
      this.selectedDate = new Date(e.value)

      let popularity = this.moviePopularity.getMoviePopularity(this.showingsList, this.selectedMovie, this.selectedDate);
      this.chartData = {
        labels: popularity.labels,
        datasets: [
          {
            label: 'sprzedane bilety',
            data: popularity.ticketsCount,
            backgroundColor: [this.BLUE, this.BLUE, this.BLUE, this.PURPLE, this.BLUE, this.BLUE, this.BLUE],
          }
        ],
      }
    }
  }
}
