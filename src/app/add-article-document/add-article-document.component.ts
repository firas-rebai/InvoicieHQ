import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Article } from '../_models/Article';
import { TVA } from '../_models/TVA';
import { FamilleArticle } from '../_models/FamilleArticle';
import { Unite } from '../_models/Unite';
import { Fournisseur } from '../_models/Fournisseur';
import { ArticleService } from '../_services/article.service';
import { ParamService } from '../_services/param.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ArticleDocument } from '../_models/ArticleDocument';
import { MatDialog } from '@angular/material/dialog';
import { ArticleComponent } from '../article-components/article/article.component';
import { AddArticleComponent } from '../article-components/add-article/add-article.component';
import { FormControl, FormGroup } from '@angular/forms';
import { FournisseurService } from '../_services/fournisseur.service';
import { ListArticleComponent } from '../list-article/list-article.component';
import { modelTest } from '../_models/modelTest';
import { AddParamComponent } from '../add-param/add-param.component';

@Component({
	selector: 'app-add-article-document',
	templateUrl: './add-article-document.component.html',
	styleUrls: ['./add-article-document.component.css'],
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

	constructor(
		private articleService: ArticleService,
		private paramService: ParamService,
		public dialog: MatDialog,
		private fournisseurService: FournisseurService
	) {}

	ngAfterViewInit(): void {
		this.getData();
	}

	public add(article: ArticleDocument): void {

		this.article = article;
	}

	public getData(): void {
		this.paramService.getTVAs().subscribe(
			(response) => {
				const data = response.map((e:any) => {
					const data = e.payload.doc.data();
					data.id = e.payload.doc.id;
					return data;
				})
				this.tvas = data;
			},
			(error: HttpErrorResponse) => {
				console.log(error.message);
			}
		);
		this.paramService.getUnites().subscribe(
			(response) => {
				const data = response.map((e:any) => {
					const data = e.payload.doc.data();
					data.id = e.payload.doc.id;
					return data;
				})
				this.unites = data;
			},
			(error: HttpErrorResponse) => {
				console.log(error);
			}
		);
		this.paramService.getFamilles().subscribe(
			(response) => {
				const data = response.map((e:any) => {
					const data = e.payload.doc.data();
					data.id = e.payload.doc.id;
					return data;
				})
				this.familles = data;
			},
			(error: HttpErrorResponse) => {
				console.log(error);
			}
		);
		this.fournisseurService.getFournisseurs().subscribe(
			(response) => {
				const data = response.map((e:any) => {
					const data = e.payload.doc.data();
					data.id = e.payload.doc.id;
					return data;
				})
				this.fournisseurs = data;
			},
			(error: HttpErrorResponse) => {
				console.log(error.message);
			}
		);
	}

	debug() {
		console.log(this.article);

	}

	ngOnInit(): void {
		this.article = new ArticleDocument(
			new Article(
				'',
				new Unite(''),
				0,
				new Date(),
				new FamilleArticle(''),
				0,
				0,
				new Fournisseur(),
				new TVA('0')
			),
			0,
			0,
			0,
			0,
			0
		);
	}

	openArticle() {
		const dialogRef = this.dialog.open(ListArticleComponent);

		dialogRef.afterClosed().subscribe((result: Article) => {
			this.article.article = result;
		});
	}

	openAddArticle() {
		const dialogRef = this.dialog.open(AddArticleComponent);

		dialogRef.afterClosed().subscribe((result: FormGroup) => {
			this.article.article = result.value;
		});
	}

	numberOnly(event): boolean {
		const charCode = (event.which) ? event.which : event.keyCode;
		return (charCode > 47 && charCode < 58) || charCode == 46

	  }

	  openAddTVA() {
		const dialogRef = this.dialog.open(AddParamComponent, {
			data: { message: 'tva' },
		});
		dialogRef.afterClosed().subscribe((result: string) => {
			result = result.replaceAll('_', ' ');
			result = result.trim();
			// @ts-ignore
			let tva: TVA = { id: null, base: result };
			this.paramService.addTVA(tva);
		});
	}
}
