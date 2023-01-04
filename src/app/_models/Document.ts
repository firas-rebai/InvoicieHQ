import {Client} from "./Client";
import {Fournisseur} from "./Fournisseur";
import {ArticleDocument} from "./ArticleDocument";
import {User} from "./User";

export class Document {
	get client(): Client | null {
		return this._client;
	}

	set client(value: Client | null) {
		this._client = value;
	}

	get fournisseur(): Fournisseur | null {
		return this._fournisseur;
	}

	set fournisseur(value: Fournisseur | null) {
		this._fournisseur = value;
	}

	private _id: bigint;
	private _client: Client | null;
	private _fournisseur: Fournisseur | null;
	private _date_vente: Date;
	private _type: string;
	private _transaction: string;
	private _articles: ArticleDocument[];
	private _user: User;

	get id(): bigint {
		return this._id;
	}

	set id(value: bigint) {
		this._id = value;
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
