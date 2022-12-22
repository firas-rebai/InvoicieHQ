export class TVA {
  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }
  get base(): string {
    return this._base;
  }

  set base(value: string) {
    this._base = value;
  }
  private _id : number;
  private _base: string;

}
