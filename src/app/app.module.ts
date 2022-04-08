import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { ChartModule } from 'angular2-chartjs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';

import { AppComponent } from './app.component';

import { ShowingsComponent } from './showings/showings/showings.component';
import { AddShowingComponent } from './showings/add-showing/add-showing.component';
import { EditShowingComponent } from './showings/edit-showing/edit-showing.component';
import { ShowingComponent } from './showings/showing/showing.component';
import { RoomsComponent } from './room/rooms/rooms.component';
import { EditMovieComponent } from './movie/edit-movie/edit-movie.component';
import { AddMovieComponent } from './movie/add-movie/add-movie.component';
import { MovieComponent } from './movie/movie/movie.component';
import { MoviesComponent } from './movie/movies/movies.component';
import { HomeComponent } from './home/home.component';
import { FutureDateValidatorDirective } from './future-date-validator.directive';
import { MovieDetailsComponent } from './movie/movie-details/movie-details.component';
import { OutdatedShowingDirective } from './outdated-showing.directive';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './navigation/header/header.component';
import { BuyTicketComponent } from './showings/buy-ticket/buy-ticket.component';
import { DateTransformPipe } from './date-transform.pipe';



@NgModule({
  declarations: [
    AppComponent,
    ShowingsComponent,
    AddShowingComponent,
    EditShowingComponent,
    ShowingComponent,
    RoomsComponent,
    EditMovieComponent,
    AddMovieComponent,
    MovieComponent,
    MoviesComponent,
    HomeComponent,
    FutureDateValidatorDirective,
    MovieDetailsComponent,
    OutdatedShowingDirective,
    HeaderComponent,
    BuyTicketComponent,
    DateTransformPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatDialogModule,
    MatCardModule,
    MatSelectModule,
    ChartModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
    MatTabsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
 ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatDialogModule,
    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
