import {Unite} from "./Unite";
import {TVA} from "./TVA";

export class ArticleDocument {
  private _id : number;
  private _designation : string;
  private _unite: Unite;
  private _quantite : number;
  private _puht : number;
  private _puttc : number;
  private _remise : number;
  private _pu_reel : number;
  private _montant_ht : number;

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get designation(): string {
    return this._designation;
  }

  set designation(value: string) {
    this._designation = value;
  }

  get unite(): Unite {
    return this._unite;
  }

  set unite(value: Unite) {
    this._unite = value;
  }

  get quantite(): number {
    return this._quantite;
  }

  set quantite(value: number) {
    this._quantite = value;
  }

  get puht(): number {
    return this._puht;
  }

  set puht(value: number) {
    this._puht = value;
  }

  get puttc(): number {
    return this._puttc;
  }

  set puttc(value: number) {
    this._puttc = value;
  }

  get remise(): number {
    return this._remise;
  }

  set remise(value: number) {
    this._remise = value;
  }

  get pu_reel(): number {
    return this._pu_reel;
  }

  set pu_reel(value: number) {
    this._pu_reel = value;
  }

  get montant_ht(): number {
    return this._montant_ht;
  }

  set montant_ht(value: number) {
    this._montant_ht = value;
  }

  get tva(): TVA {
    return this._tva;
  }

  set tva(value: TVA) {
    this._tva = value;
  }

  private _tva : TVA;
}