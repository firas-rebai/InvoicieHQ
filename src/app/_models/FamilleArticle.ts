export class FamilleArticle {
  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get famille(): string {
    return this._famille;
  }

  set famille(value: string) {
    this._famille = value;
  }
  private _id: number;
  private _famille: string;
}
