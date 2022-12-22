export class Assujetti {
  get coefficient_tva(): bigint {
    return this._coefficient_tva;
  }

  set coefficient_tva(value: bigint) {
    this._coefficient_tva = value;
  }
  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }
  get id(): bigint {
    return this._id;
  }

  set id(value: bigint) {
    this._id = value;
  }
  private _id! : bigint;
  private _type!: string;
  private _coefficient_tva!: bigint;
}
