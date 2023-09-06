import {Unite} from "./Unite";
import {TVA} from "./TVA";
import {FamilleArticle} from "./FamilleArticle";
import {Fournisseur} from "./Fournisseur";

export class Article {
  id : string;
  designation : string;
  unite: Unite;
  stock_intial : number;
  date_stock_initial : Date;
  famille_article: FamilleArticle;
  pvht : number;
  paht : number;
  fournisseur : Fournisseur;
  tva : TVA;


}
