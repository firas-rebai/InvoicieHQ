import {Unite} from "./Unite";
import {TVA} from "./TVA";
import {Article} from "./Article";

export class ArticleDocument {
	constructor(article: Article, quantite: number, puht: number, puttc: number, remise: number, pu_reel: number, montant_ht: number, tva: TVA) {
		this.article = article;
		this.quantite = quantite;
		this.puht = puht;
		this.puttc = puttc;
		this.remise = remise;
		this.pu_reel = pu_reel;
		this.montant_ht = montant_ht;
		this.tva = tva;
	}

	id: number;
	article: Article;
	quantite: number;
	puht: number;
	puttc: number;
	remise: number;
	pu_reel: number;
	montant_ht: number;
	tva: TVA;
}
