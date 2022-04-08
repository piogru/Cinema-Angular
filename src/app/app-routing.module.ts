import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movie/movies/movies.component';
import { RoomsComponent } from './room/rooms/rooms.component';
import { ShowingsComponent } from './showings/showings/showings.component';
import { MovieDetailsComponent } from './movie/movie-details/movie-details.component';

const routes: Routes = [
  { path: 'movies', component: MoviesComponent },
  { path: 'movies/:id', component: MovieDetailsComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'showings', component: ShowingsComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // , {enableTracing: true}
  exports: [RouterModule]
})
export class AppRoutingModule { }
