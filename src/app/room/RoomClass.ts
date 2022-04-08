export class Room {
  constructor(
    private _capacity: number,
    private _id?: number,
  ) { }

  public get id(): number | undefined {
    return this._id;
  }
  public set id(value: number | undefined) {
    this._id = value;
  }
  public get capacity(): number {
    return this._capacity;
  }
  public set capacity(value: number) {
    this._capacity = value;
  }
}
