import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Room } from '../room/RoomClass';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  private url = 'http://localhost:7777/rooms';

  getRooms(): Observable<Room[]> {
    return this.http
      .get<Room[]>(this.url)
      .pipe(catchError(this.handleError<Room[]>('getRooms', [])));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation + ' failed' + error);
      return of(result as T);
    };
  }

  constructor(private http: HttpClient) {}
}

