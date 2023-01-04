import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Article} from "../_models/Article";
import {TVA} from "../_models/TVA";
import {FamilleArticle} from "../_models/FamilleArticle";
import {Unite} from "../_models/Unite";
import {Fournisseur} from "../_models/Fournisseur";
import {ArticleService} from "../_services/article.service";
import {ParamService} from "../_services/param.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ArticleDocument} from "../_models/ArticleDocument";
import {MatDialog} from "@angular/material/dialog";
import {ArticleComponent} from "../article-components/article/article.component";
import {AddArticleComponent} from "../article-components/add-article/add-article.component";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-add-article-document',
  templateUrl: './add-article-document.component.html',
  styleUrls: ['./add-article-document.component.css']
})
export class AddArticleDocumentComponent implements OnInit, AfterViewInit{
  article: ArticleDocument;
  selectedTVA: TVA;
  selectedFamille: FamilleArticle;
  selectedUnite: Unite;
  selectedFournisseur: Fournisseur;
  tvas: TVA[];
  familles: FamilleArticle[];
  fournisseurs: Fournisseur[];
  unites: Unite[];


  constructor(private articleService: ArticleService, private paramService: ParamService, public dialog: MatDialog) {
  }

  ngAfterViewInit(): void {
    this.getTVAs();
    }


  public add(article: ArticleDocument): void {
    this.article = article;
    this.article.tva = this.selectedTVA


  }


  public getTVAs(): void {
    this.paramService.getTVAs().subscribe(
      (response: TVA[]) => {
        this.tvas = response;
      }, (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    )
  }

  ngOnInit(): void {

    this.article = new ArticleDocument()
    this.article.article = new Article()
  }

  openAddUnite() {
    const dialogRef = this.dialog.open(ArticleComponent);

    dialogRef.afterClosed().subscribe((result: ArticleDocument) => {

    });
  }

  openAddTVA() {
    const dialogRef = this.dialog.open(ArticleComponent);

    dialogRef.afterClosed().subscribe((result: ArticleDocument) => {

    });
  }

  openAddFournisseur() {
    const dialogRef = this.dialog.open(ArticleComponent);

    dialogRef.afterClosed().subscribe((result: ArticleDocument) => {

    });
  }

  openArticle() {
    const dialogRef = this.dialog.open(ArticleComponent);

    dialogRef.afterClosed().subscribe((result: Article) => {
      this.article.article = result
    });
  }

  openAddArticle() {
    const dialogRef = this.dialog.open(AddArticleComponent);

    dialogRef.afterClosed().subscribe((result: FormGroup) => {
      this.article.article = result.value;
    });
  }
}
