import {Unite} from "./Unite";
import {TVA} from "./TVA";
import {FamilleArticle} from "./FamilleArticle";
import {Fournisseur} from "./Fournisseur";

export class Article {
  id : number;
  designation : string;
  unite: Unite;
  stock_intial : number;
  date_stock_initial : number;
  famille_article: FamilleArticle;
  pvht : number;
  paht : number;
  tva : TVA;
  fournisseur : Fournisseur;


	constructor( designation: string, unite: Unite, stock_intial: number, date_stock_initial: number, famille_article: FamilleArticle, pvht: number, paht: number, tva: TVA, fournisseur: Fournisseur) {
		this.designation = designation;
		this.unite = unite;
		this.stock_intial = stock_intial;
		this.date_stock_initial = date_stock_initial;
		this.famille_article = famille_article;
		this.pvht = pvht;
		this.paht = paht;
		this.tva = tva;
		this.fournisseur = fournisseur;
	}
}
