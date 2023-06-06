import {Client} from "./Client";
import {Fournisseur} from "./Fournisseur";
import {ArticleDocument} from "./ArticleDocument";
import {User} from "./User";

export class Document {
	id: string;
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
	net_payer: string;
	missing_articles: boolean;
	paid: boolean;
	installation : number;
	transport : number;
	payment_method : string;
}
