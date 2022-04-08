export class Showing {
  constructor(
    private _movieId: number,
    private _roomId: number,
    private _date: string,
    private _ticketsSold: number = 0,
    private _takenSeats: number[] = [],
    private _ticketsAvailable?: number,
    private _id?: number, // optional id
  ) { }

  public get id(): number | undefined {
    return this._id;
  }
  public set id(value: number | undefined) {
    this._id = value;
  }

  public get movieId(): number {
    return this._movieId;
  }
  public set movieId(value: number) {
    this._movieId = value;
  }

  public get roomId(): number {
    return this._roomId;
  }
  public set roomId(value: number) {
    this._roomId = value;
  }

  public get date(): string {
    return this._date;
  }
  public set date(value: string) {
    this._date = value;
  }

  public get ticketsSold(): number {
    return this._ticketsSold;
  }
  public set ticketsSold(value: number) {
    this._ticketsSold = value;
  }

  public get takenSeats(): number[] {
    return this._takenSeats;
  }
  public set takenSeats(value: number[]) {
    this._takenSeats = value;
  }

  public get ticketsAvailable(): number | undefined {
    return this._ticketsAvailable;
  }
  public set ticketsAvailable(value: number | undefined) {
    this._ticketsAvailable = value;
  }
}
