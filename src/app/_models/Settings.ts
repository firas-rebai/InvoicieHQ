import {Assujetti} from "./Assujetti";
import {TVA} from "./TVA";

export class Settings {
	constructor(assujetti: Assujetti, raison_social: string, email: string, fax: string, telephone: string, mobile: string, adresse: string, tva: TVA, registre_commerce: string, fodec: number, logo: string, retenue_source: number, timbre: number, fb_acc: string, logoType : string) {
		this.assujetti = assujetti;
		this.raison_social = raison_social;
		this.email = email;
		this.fax = fax;
		this.telephone = telephone;
		this.mobile = mobile;
		this.adresse = adresse;
		this.tva = tva;
		this.registre_commerce = registre_commerce;
		this.fodec = fodec;
		this.logo = logo;
		this.retenue_source = retenue_source;
		this.timbre = timbre;
		this.fb_acc = fb_acc;
		this.logoType = logoType;
	}

	_id: string;

	assujetti: Assujetti;

	raison_social: string;

	email: string;

	fax: string;

	telephone: string;

	mobile: string;

	adresse: string;

	tva: TVA;

	registre_commerce: string;

	fodec: number;

	logo: string;

	retenue_source: number;

	timbre: number;

	fb_acc: string;

	logoType : string;

	RIB : string;

	last_document_id: string;
}
