import {Assujetti} from "./Assujetti";
import {TVA} from "./TVA";

export class Client {
	get mobile(): string {
		return this._mobile;
	}

	set mobile(value: string) {
		this._mobile = value;
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

	get raison_social(): string {
		return this._raison_social;
	}

	set raison_social(value: string) {
		this._raison_social = value;
	}

	get assujetti(): Assujetti {
		return this._assujetti;
	}

	set assujetti(value: Assujetti) {
		this._assujetti = value;
	}

	private _id!: bigint;

	private _assujetti!: Assujetti;

	private _raison_social!: string;

	private _email!: string;

	private _fax!: string;

	private _telephone!: string;

	private _mobile!: string;

	private _adresse!: string;

	private _tva: TVA;

	get id(): bigint {
		return this._id;
	}

	set id(value: bigint) {
		this._id = value;
	}


}
