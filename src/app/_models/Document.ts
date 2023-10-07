import {Client} from "./Client";
import {Fournisseur} from "./Fournisseur";
import {ArticleDocument} from "./ArticleDocument";
import {User} from "./User";
import { TVA } from "./TVA";

export class Document {
	_id: string;
	client: Client | null;
	fournisseur: Fournisseur | null;
	date: Date;
	type: string;
	transaction: string;
	articleDocument: ArticleDocument[];
	user: User;
	reference: string;
	montant_ht: string;
	montant_ttc: string;
	montant_remise: string;
	net_payer: string;
	missing_articles: boolean;
	paid: boolean;
	installation : number;
	transport : number;
	payment_method : string;
	tva: TVA;
}
