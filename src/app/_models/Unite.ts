export class Unite {
  get unite(): string {
    return this._unite;
  }

  set unite(value: string) {
    this._unite = value;
  }
  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }
  private _id : number;
  private _unite : string;
}
