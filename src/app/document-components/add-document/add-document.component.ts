import { ParameterService } from './../../_services/parameter.service';
import { ParamService } from './../../_services/param.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ArticleService } from '../../_services/article.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ArticleDocument } from '../../_models/ArticleDocument';
import { AddArticleDocumentComponent } from '../../add-article-document/add-article-document.component';
import { Document } from '../../_models/Document';
import { Fournisseur } from '../../_models/Fournisseur';
import { Client } from '../../_models/Client';
import { ClientService } from '../../_services/client.service';
import { FournisseurService } from '../../_services/fournisseur.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AddFournisseurComponent } from '../../fournisseur-components/add-fournisseur/add-fournisseur.component';
import { AddClientComponent } from '../../client-components/add-client/add-client.component';
import { TokenStorageService } from '../../_services/token-storage.service';
import { DocumentService } from '../../_services/document.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Settings } from 'src/app/_models/Settings';

@Component({
	selector: 'app-add-document',
	templateUrl: './add-document.component.html',
	styleUrls: ['./add-document.component.css'],
})
export class AddDocumentComponent implements OnInit, AfterViewInit {
	// articleDocument: MatTableDataSource<ArticleDocument> = new MatTableDataSource<ArticleDocument>();
	articleDocument: ArticleDocument[] = [];
	document: Document = new Document();
	displayedColumns: string[] = [
		'designation',
		'quantite',
		'unite',
		'puht',
		'tva',
		'puttc',
		'remise',
		'montant',
		'montant_ttc',
		'action',
	];
	fournisseurs: Fournisseur[];
	clients: Client[];

	@ViewChild(MatTable) table: MatTable<ArticleDocument>;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	montant_total: number = 0;
	montant_remise: number = 0;
	montant_ttc: number = 0;
	net_payer: number = 0;
	settings : Settings;
	ngAfterViewInit() {
		// this.articleDocument.paginator = this.paginator;
	}

	constructor(
		private articleService: ArticleService,
		private clientService: ClientService,
		private fournisseurService: FournisseurService,
		private documentService: DocumentService,
		private router: Router,
		public dialog: MatDialog,
		private tokenStorage: TokenStorageService,
		private snackBar: MatSnackBar,
		private settingsService : ParameterService
	) {}

	submit() {
		const form: FormData = new FormData();
		//this.document.articleDocument = this.articleDocument;
		// this.document.user = this.tokenStorage.getUser();
		console.log(this.document);
		this.documentService.addDocument(this.document).subscribe(
			(result) => {
				console.log(result);
				form.append('documentId', result.id.toString());
				this.documentService
					.saveArticles(this.articleDocument, result.id)
					.subscribe(
						(result_final) => {
							console.log(result_final);
							this.snackBar.open(
								'Le document ' +
									result_final.reference +
									' est ajouter',
								'',
								{ duration: 5 * 1000 }

							);
							this.router.navigate(["/home"])
						},
						(error) => {
							console.log('error');
						}
					);
			},
			(error) => {
				console.log(error);
			}
		);
	}

	print() {
		const form: FormData = new FormData();
		console.log(this.document);
		this.documentService.addDocument(this.document).subscribe(
			(result) => {
				console.log(result);
				form.append('documentId', result.id.toString());
				this.documentService
					.saveArticles(this.articleDocument, result.id)
					.subscribe(
						(result_final) => {
							this.documentService
								.generatePDF(result.id)
								.subscribe(
									(response) => {
										const file = new Blob([response], {
											type: 'application/pdf',
										});
										const pdf = URL.createObjectURL(file);
										// this.pdf = 'data:application/pdf;base64,' + file.text;
										window.open(pdf);
										this.router.navigate(["/home"])
									},
									(error) => {
										console.log(error);
									}
								);
							console.log(result_final);
							this.snackBar.open(
								'Le document ' +
									result_final.reference +
									' est ajouter',
								'',
								{ duration: 5 * 1000 }
							);

						},
						(error) => {
							console.log('error');
						}
					);
			},
			(error) => {
				console.log(error);
			}
		);
	}

	calculate() {
		this.montant_remise = 0
		this.montant_total = 0
		this.montant_ttc = 0
		this.articleDocument.forEach((article) => {
			var ht = article.puht * article.quantite;
			this.montant_total += ht;
			this.montant_ttc += (parseFloat(article.tva.base) / 100) * article.puht * article.quantite;
			this.montant_remise += (ht + (ht * (parseFloat(article.tva.base) / 100))) * (article.remise / 100);
			this.net_payer = this.montant_total + this.montant_ttc - this.montant_remise + this.settings.timbre;
		});
	}

	ngOnInit(): void {
		this.getData();
	}

	getData() {
		this.clientService.getClients().subscribe(
			(result: Client[]) => {
				this.clients = result;
			},
			(error: HttpErrorResponse) => {
				console.log(error.message);
			}
		);

		this.fournisseurService.getFournisseurs().subscribe(
			(result) => {
				this.fournisseurs = result;
			},
			(error: HttpErrorResponse) => {
				console.log(error.message);
			}
		);

		this.settingsService.getSettings().subscribe(
			(result) => {
				this.settings = result;
			}, (error) => {
				console.log(error)
			}
		)
	}

	AddDialog() {
		const dialogRef = this.dialog.open(AddArticleDocumentComponent);
		dialogRef.afterClosed().subscribe((result: ArticleDocument) => {
			if (result) {
				// this.articleDocument.data.push(result);
				result.montant_ht = result.puht * result.quantite;
				if (result.article.tva != undefined)
					result.puttc =
						result.puht * parseInt(result.article.tva.base) +
						result.puht;
				else result.puttc = result.puht;
				this.articleDocument.push(result);
				this.table.renderRows();
				this.calculate();
			}
		});
	}

	RemoveArticle(index: number) {
		this.articleDocument.splice(index, 1);
		this.table.renderRows();
		this.calculate();
	}

	openSnackBar(message: string) {
		this.snackBar.open(message);
	}

	AddClient() {
		const dialogRef = this.dialog.open(AddClientComponent);

		dialogRef.afterClosed().subscribe((result: Client) => {
			this.document.client = result;
			this.getData();
		});
	}

	AddFournisseur() {
		const dialogRef = this.dialog.open(AddFournisseurComponent);

		dialogRef.afterClosed().subscribe((result: Fournisseur) => {
			this.document.fournisseur = result;
			this.getData();
		});
	}
}
