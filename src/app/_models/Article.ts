import {Unite} from "./Unite";
import {TVA} from "./TVA";
import {FamilleArticle} from "./FamilleArticle";
import {Fournisseur} from "./Fournisseur";

export class Article {
  private _id : number;
  private _designation : string;
  private _unite: Unite;
  private _stock_intial : number;
  private _date_stock_initial : number;
  private _famille: FamilleArticle;
  private _pvht : number;
  private _paht : number;
  private _tva : TVA;
  private _fournisseur : Fournisseur;

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

  get stock_intial(): number {
    return this._stock_intial;
  }

  set stock_intial(value: number) {
    this._stock_intial = value;
  }

  get date_stock_initial(): number {
    return this._date_stock_initial;
  }

  set date_stock_initial(value: number) {
    this._date_stock_initial = value;
  }

  get famille(): FamilleArticle {
    return this._famille;
  }

  set famille(value: FamilleArticle) {
    this._famille = value;
  }

  get pvht(): number {
    return this._pvht;
  }

  set pvht(value: number) {
    this._pvht = value;
  }

  get paht(): number {
    return this._paht;
  }

  set paht(value: number) {
    this._paht = value;
  }

  get tva(): TVA {
    return this._tva;
  }

  set tva(value: TVA) {
    this._tva = value;
  }

  get fournisseur(): Fournisseur {
    return this._fournisseur;
  }

  set fournisseur(value: Fournisseur) {
    this._fournisseur = value;
  }
}
