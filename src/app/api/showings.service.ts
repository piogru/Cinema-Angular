import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Showing } from '../showings/ShowingClass';

interface IShowing {
  _movieId: number;
  _roomId: number;
  _date: string;
  _ticketsSold: number;
  _ticketsAvailable: number;
  _takenSeats: number[];
  _id: number;
}

@Injectable({
  providedIn: 'root'
})
export class ShowingsService {
  private url = 'http://localhost:7777/showings/';

  getShowings(): Observable<Showing[]> {
    return this.http
      .get<IShowing[]>(this.url)
      .pipe(
        map(response => {
        let ret: Showing[] = response.map(
          showing =>
          (
            new Showing(showing._movieId, showing._roomId, showing._date, showing._ticketsSold,
              showing._takenSeats,  showing._ticketsAvailable, showing._id)
          )
        );
        return ret;
      }))
      .pipe(catchError(this.handleError<Showing[]>('getShowings', [])));
  }

  addShowing(showing: Showing): Observable<Showing> {
    console.log("showings service", showing)
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http
      .post<IShowing>(this.url, showing, httpOptions)
      .pipe(
        map(showing => {
          return new Showing(showing._movieId, showing._roomId, showing._date, showing._ticketsSold,
            showing._takenSeats, showing._ticketsAvailable, showing._id);
        }))
      .pipe(catchError(this.handleError<Showing>('addShowing')));
  }

  editShowing(showing: Showing): Observable<Showing> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    let url: string = this.url + showing.id;
    return this.http
      .put<IShowing>(url, showing, httpOptions)
      .pipe(
        map(showing => {
          return new Showing(showing._movieId, showing._roomId, showing._date, showing._ticketsSold,
            showing._takenSeats, showing._ticketsAvailable, showing._id);
        }))
      .pipe(catchError(this.handleError<Showing>('editShowing')));
  }

  deleteShowing(showing: Showing): Observable<Showing> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    let url: string = this.url + showing.id;
    return this.http
      .delete<Showing>(url, httpOptions)
      .pipe(catchError(this.handleError<Showing>('deleteShowing')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation + ' failed' + error);
      return of(result as T);
    };
  }

  constructor(private http: HttpClient) {}
}

