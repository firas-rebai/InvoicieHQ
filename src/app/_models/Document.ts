import {Client} from "./Client";
import {Fournisseur} from "./Fournisseur";
import {ArticleDocument} from "./ArticleDocument";
import {User} from "./User";

export class Document {


	id: bigint;
	client: Client | null;
	fournisseur: Fournisseur | null;
	date: Date;
	type: string;
	transaction: string;
	articleDocument: ArticleDocument[];
	user: User;

}
