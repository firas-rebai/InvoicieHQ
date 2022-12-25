import {Client} from "./Client";
import {Fournisseur} from "./Fournisseur";
import {ArticleDocument} from "./ArticleDocument";

export class Document {
  private _id : bigint;
  private _client : Client;
  private _founisseur : Fournisseur;
  private _date_vente : Date;
  private _type : string;
  private _transaction: string;
  private _articles : ArticleDocument[];

  get id(): bigint {
    return this._id;
  }

  set id(value: bigint) {
    this._id = value;
  }

  get client(): Client {
    return this._client;
  }

  set client(value: Client) {
    this._client = value;
  }

  get founisseur(): Fournisseur {
    return this._founisseur;
  }

  set founisseur(value: Fournisseur) {
    this._founisseur = value;
  }

  get date_vente(): Date {
    return this._date_vente;
  }

  set date_vente(value: Date) {
    this._date_vente = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get transaction(): string {
    return this._transaction;
  }

  set transaction(value: string) {
    this._transaction = value;
  }

  get articles(): ArticleDocument[] {
    return this._articles;
  }

  set articles(value: ArticleDocument[]) {
    this._articles = value;
  }
}
