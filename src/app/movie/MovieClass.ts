export class Movie {
  constructor(
    private _title: string,
    private _length: number,
    private _id?: number, //optional id
  ) { }

  public get title(): string {
    return this._title;
  }
  public set title(value: string) {
    this._title = value;
  }
  public get length(): number {
    return this._length;
  }
  public set length(value: number) {
    this._length = value;
  }
  public get id(): number | undefined {
    return this._id;
  }
  public set id(value: number | undefined) {
    this._id = value;
  }
}
