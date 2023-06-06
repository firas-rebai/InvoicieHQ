import { MatSnackBar } from '@angular/material/snack-bar';
import { AddFournisseurComponent } from './../../fournisseur-components/add-fournisseur/add-fournisseur.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Client } from '../../_models/Client';
import { Assujetti } from '../../_models/Assujetti';
import { TVA } from '../../_models/TVA';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../_services/client.service';
import { ParamService } from '../../_services/param.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Article } from '../../_models/Article';
import { ArticleService } from '../../_services/article.service';
import { FamilleArticle } from '../../_models/FamilleArticle';
import { Fournisseur } from '../../_models/Fournisseur';
import { Unite } from '../../_models/Unite';
import { FournisseurService } from '../../_services/fournisseur.service';
import { AddParamComponent } from 'src/app/add-param/add-param.component';

@Component({
	selector: 'app-add-article',
	templateUrl: './add-article.component.html',
	styleUrls: ['./add-article.component.css'],
})
export class AddArticleComponent implements OnInit, AfterViewInit {
	article: Article;
	selectedTVA: TVA;
	selectedFamille: FamilleArticle;
	selectedUnite: Unite;
	selectedFournisseur: Fournisseur;
	tvas: TVA[];
	familles: FamilleArticle[];
	fournisseurs: Fournisseur[];
	unites: Unite[];

	public articleForm = new FormGroup({
		designation: new FormControl('', [
			Validators.required,
			Validators.pattern("^[a-zA-Z0-9' ]{2,1000}$"),
		]),
		stock_initial: new FormControl('', []),
		date_stock_initial: new FormControl('', []),
		pvht: new FormControl('', [Validators.pattern('^[0-9.,]{2,1000}$')]),
		paht: new FormControl('', [Validators.pattern('^[0-9.,]{2,1000}$')]),
		tva: new FormControl('', []),
		famille_article: new FormControl('', []),
		fournisseur: new FormControl('', []),
		unite: new FormControl('', []),
	});

	get designation() {
		return this.articleForm.controls['designation'];
	}

	constructor(
		private articleService: ArticleService,
		private fournisseurService: FournisseurService,
		private paramService: ParamService,
		private dialog: MatDialog,
		private snackBar: MatSnackBar
	) {}

	ngAfterViewInit(): void {
		this.getData();
	}

	public add(addForm: FormGroup): void {
		if (addForm.invalid) return;
		this.article = addForm.value;

		this.articleService.addArticle(this.article)
		/* .subscribe(
			(response: Article) => {
				this.snackBar.open(response.designation + ' est ajouté', '', {
					duration : 5 * 1000,
				});
				console.log(response)
			},
			(error) => {
				console.log('error : ' + error.message);
			}
		); */
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
				console.log(error.message);
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
				console.log(response);
			},
			(error: HttpErrorResponse) => {
				console.log(error.message);
			}
		);
	}

	ngOnInit(): void {}

	openAddUnite() {
		const dialogRef = this.dialog.open(AddParamComponent, {
			data: { message: 'unite' },
		});
		dialogRef.afterClosed().subscribe((result: string) => {
			result = result.split('_')[0];
			// @ts-ignore
			let unite: Unite = { id: null, unite: result };
			this.paramService.addUnite(unite);
		});
	}

	openAddFamille() {
		const dialogRef = this.dialog.open(AddParamComponent, {
			data: { message: 'famille' },
		});
		dialogRef.afterClosed().subscribe((result: string) => {
			result = result.replace('_', ' ');
			result = result.trim();
			// @ts-ignore
			let famille: FamilleArticle = { id: null, famille: result };
			this.paramService.addFamille(famille);
		});
	}

	openAddFournisseur() {
		const dialogRef = this.dialog.open(AddFournisseurComponent);

		dialogRef.afterClosed().subscribe((result) => {
			this.getData();
		});
	}
	numberOnly(event): boolean {
		const charCode = (event.which) ? event.which : event.keyCode;
		return (charCode > 47 && charCode < 58) || charCode == 46

	  }
}
