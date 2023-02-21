import {Unite} from "./Unite";
import {TVA} from "./TVA";
import {Article} from "./Article";

export class ArticleDocument {
	constructor(article: Article, quantite: number, puht: number, puttc: number, remise: number, montant_ht: number) {
		this.article = article;
		this.quantite = quantite;
		this.puht = puht;
		this.puttc = puttc;
		this.remise = remise;
		this.montant_ht = montant_ht;
	}

	id: number;
	article: Article;
	quantite: number;
	puht: number;
	puttc: number;
	remise: number;
	montant_ht: number;
}
