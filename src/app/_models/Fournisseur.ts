import {Assujetti} from "./Assujetti";
import {TVA} from "./TVA";

export class Fournisseur {
	constructor() {
	}
	id: bigint;

	fodec: boolean;

	raison_social: string;

	email: string;

	fax: string;

	telephone: string;

	mobile: string;

	adresse: string;
	tva: TVA;

	ht_ttc: string;

}
