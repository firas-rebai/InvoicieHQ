import {Assujetti} from "./Assujetti";
import {TVA} from "./TVA";

export class Fournisseur {
  get ht_ttc(): string {
    return this._ht_ttc;
  }

  set ht_ttc(value: string) {
    this._ht_ttc = value;
  }

  get fodec(): boolean {
    return this._fodec;
  }

  set fodec(value: boolean) {
    this._fodec = value;
  }

  get tva(): TVA {
    return this._tva;
  }

  set tva(value: TVA) {
    this._tva = value;
  }

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

  private _id!: bigint;

  private _fodec: boolean;

  private _raisonSocial!: string;

  private _email!: string;

  private _fax!: string;

  private _telephone!: string;

  private _adresse!: string;

  private _tva: TVA;

  private _ht_ttc: string;

  get id(): bigint {
    return this._id;
  }

  set id(value: bigint) {
    this._id = value;
  }


}
