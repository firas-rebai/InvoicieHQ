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
import {FormControl, FormGroup} from "@angular/forms";
import {FournisseurService} from "../_services/fournisseur.service";
import {ListArticleComponent} from "../list-article/list-article.component";
import {modelTest} from "../_models/modelTest";

@Component({
	selector: 'app-add-article-document',
	templateUrl: './add-article-document.component.html',
	styleUrls: ['./add-article-document.component.css']
})
export class AddArticleDocumentComponent implements OnInit, AfterViewInit {
	article!: ArticleDocument;
	selectedTVA: TVA;
	selectedFamille: FamilleArticle;
	selectedUnite: Unite;
	selectedFournisseur: Fournisseur;
	tvas: TVA[];
	familles: FamilleArticle[];
	fournisseurs: Fournisseur[];
	unites: Unite[];
	test: modelTest = new modelTest('');

	articleForm: FormGroup = new FormGroup({
		designation: new FormControl('', []),
	});

	uniteForm: FormGroup = new FormGroup({
		unite: new FormControl('', []),
	});

	tvaForm: FormGroup = new FormGroup({
		base: new FormControl('', []),
	});


	constructor(private articleService: ArticleService, private paramService: ParamService, public dialog: MatDialog, private fournisseurService: FournisseurService) {
	}

	ngAfterViewInit(): void {
		this.getData();
	}


	public add(article: ArticleDocument): void {
		this.article = article;
		this.article.tva = this.selectedTVA;
	}


	public getData(): void {
		this.paramService.getTVAs().subscribe(
			(response: TVA[]) => {
				this.tvas = response;
			}, (error: HttpErrorResponse) => {
				console.log(error.message)
			}
		)
		this.paramService.getUnites().subscribe(
			(response) => {
				this.unites = response;
			}, (error: HttpErrorResponse) => {
				console.log(error)
			}
		)
		this.paramService.getFamilles().subscribe(
			(response) => {
				this.familles = response;
			}, (error: HttpErrorResponse) => {
				console.log(error)
			}
		)
		this.fournisseurService.getFournisseurs().subscribe(
			(response) => {
				this.fournisseurs = response
			}, (error: HttpErrorResponse) => {
				console.log(error.message)
			}
		)
	}

	ngOnInit(): void {
		this.article = new ArticleDocument(new Article("", new Unite(''), 0, 0, new FamilleArticle(''), 0, 0, new TVA(''), new Fournisseur()),0,0,0,0,0,0,new TVA(""))
	}


	openArticle() {
		const dialogRef = this.dialog.open(ListArticleComponent);

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
