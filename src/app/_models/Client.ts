import {Assujetti} from "./Assujetti";

export class Client {
  get adresse(): string {
    return this._adresse;
  }

  set adresse(value: string) {
    this._adresse = value;
  }
  get telephone(): string {
    return this._telephone;
  }

  set telephone(value: string) {
    this._telephone = value;
  }
  get fax(): string {
    return this._fax;
  }

  set fax(value: string) {
    this._fax = value;
  }
  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }
  get raisonSocial(): string {
    return this._raisonSocial;
  }

  set raisonSocial(value: string) {
    this._raisonSocial = value;
  }
  get assujetti(): Assujetti {
    return this._assujetti;
  }

  set assujetti(value: Assujetti) {
    this._assujetti = value;
  }
  private _id!: bigint;

  private _assujetti!: Assujetti;

  private _raisonSocial!: string;

  private _email!: string;

  private _fax! : string;

  private _telephone!: string;

  private _adresse! : string;

  get id(): bigint {
    return this._id;
  }

  set id(value: bigint) {
    this._id = value;
  }



}
