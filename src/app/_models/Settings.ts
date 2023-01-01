import {Assujetti} from "./Assujetti";
import {TVA} from "./TVA";

export class Settings {
  get fb_acc(): string {
    return this._fb_acc;
  }

  set fb_acc(value: string) {
    this._fb_acc = value;
  }
  private _id!: bigint;

  private _assujetti!: Assujetti;

  private _raisonSocial!: string;

  private _email!: string;

  get id(): bigint {
    return this._id;
  }

  set id(value: bigint) {
    this._id = value;
  }

  get assujetti(): Assujetti {
    return this._assujetti;
  }

  set assujetti(value: Assujetti) {
    this._assujetti = value;
  }

  get raisonSocial(): string {
    return this._raisonSocial;
  }

  set raisonSocial(value: string) {
    this._raisonSocial = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get fax(): string {
    return this._fax;
  }

  set fax(value: string) {
    this._fax = value;
  }

  get telephone(): string {
    return this._telephone;
  }

  set telephone(value: string) {
    this._telephone = value;
  }

  get mobile(): string {
    return this._mobile;
  }

  set mobile(value: string) {
    this._mobile = value;
  }

  get adresse(): string {
    return this._adresse;
  }

  set adresse(value: string) {
    this._adresse = value;
  }

  get tva(): TVA {
    return this._tva;
  }

  set tva(value: TVA) {
    this._tva = value;
  }

  get registre_commerce(): string {
    return this._registre_commerce;
  }

  set registre_commerce(value: string) {
    this._registre_commerce = value;
  }

  get fodec(): number {
    return this._fodec;
  }

  set fodec(value: number) {
    this._fodec = value;
  }

  get logo(): string {
    return this._logo;
  }

  set logo(value: string) {
    this._logo = value;
  }

  get retenue_source(): number {
    return this._retenue_source;
  }

  set retenue_source(value: number) {
    this._retenue_source = value;
  }

  get timbre(): number {
    return this._timbre;
  }

  set timbre(value: number) {
    this._timbre = value;
  }

  private _fax!: string;

  private _telephone!: string;

  private _mobile!: string;

  private _adresse!: string;

  private _tva: TVA;

  private _registre_commerce: string;

  private _fodec: number;

  private _logo: string;

  private _retenue_source: number;

  private _timbre: number;

  private _fb_acc: string;
}
