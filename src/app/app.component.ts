import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MoviesService } from './api/movies.service';
import { RoomsService } from './api/rooms.service';
import { ShowingsService } from './api/showings.service';

import { Movie } from './movie/MovieClass';
import { Room } from './room/RoomClass';
import { Showing } from './showings/ShowingClass';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Kino';

  constructor(

  ) {
  }

}
