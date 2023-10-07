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
import { GeneratePdfService } from 'src/app/_services/generate-pdf.service';
import { TVA } from 'src/app/_models/TVA';
import { AddParamComponent } from 'src/app/add-param/add-param.component';
import { PrintDialogComponent } from 'src/app/print-dialog/print-dialog.component';

@Component({
	selector: 'app-add-document',
	templateUrl: './add-document.component.html',
	styleUrls: ['./add-document.component.css'],
})
export class AddDocumentComponent implements OnInit, AfterViewInit {
	// articleDocument: MatTableDataSource<ArticleDocument> = new MatTableDataSource<ArticleDocument>();
	tvas: TVA[];
	articleDocument: ArticleDocument[] = [];
	document: Document = new Document();
	displayedColumns: string[] = [
		'designation',
		'quantite',
		'unite',
		'puht',
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
	settings: Settings;
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
		private settingsService: ParameterService,
		private pdfGenerator: GeneratePdfService,
		private paramService: ParamService
	) {}

	win() {
		window.alert('hghgh');
	}

	submit() {
		let id = this.settings.last_document_id + '/' + new Date().getFullYear();
		this.settings.last_document_id = String(parseInt(this.settings.last_document_id) + 1).padStart(5, '0');
		this.settingsService.updateSettings(this.settings);
		this.document.reference = id;
		this.document.articleDocument = this.articleDocument;
		this.documentService
			.addDocument(JSON.parse(JSON.stringify(this.document)))
			.then((response) => {
				this.snackBar.open('Le document ajouté avec success', '', {
					duration: 5 * 1000,
				});
				setTimeout(() => {
					//window.location.reload();
				}, 5 * 1000);
			});
	}

	print() {
		let id = this.settings.last_document_id + '/' + new Date().getFullYear();
		this.settings.last_document_id = String(parseInt(this.settings.last_document_id) + 1).padStart(5, '0');
		this.settingsService.updateSettings(this.settings);
		this.document.reference = id;
		this.document.articleDocument = this.articleDocument;
		this.documentService.addDocument(this.document).then((response) => {
			this.snackBar.open('Le document ajouté avec success', '', {
				duration: 5 * 1000,
			});

			const dialogRef = this.dialog.open(PrintDialogComponent);

			dialogRef.afterClosed().subscribe((result: boolean) => {
				this.pdfGenerator.downloadInvoice(this.document, result);
				setTimeout(() => {
					//window.location.reload();
				}, 1000);
			});
		});
	}

	calculate() {
		this.montant_remise = 0;
		this.montant_total = 0;
		this.montant_ttc = 0;
		this.articleDocument.forEach((article) => {
			var ht = article.puht * article.quantite;
			this.montant_total += ht;
			this.montant_ttc +=
				(this.document.tva.base / 100) *
				article.puht *
				article.quantite;
			this.montant_remise +=
				(ht + ht * (this.document.tva.base / 100)) *
				(article.remise / 100);
			this.net_payer =
				this.montant_total +
				this.montant_ttc -
				this.montant_remise +
				this.settings.timbre;
		});
	}

	ngOnInit(): void {
		this.getData();
	}

	getData() {
		this.clientService.getClients().then(
			(response) => {
				const data = response.rows.map((e:any) => {
					const data = e.doc
					data._id = e.doc._id;
					return data;
				})
				this.clients = data;
			},
			(error: HttpErrorResponse) => {
				console.log(error.message);
			}
		);

		this.paramService.getTVAs().then(
			(response) => {
				const data = response.rows.map((e:any) => {
					const data = e.doc
					data._id = e.doc._id;
					return data;
				})
				this.tvas = data;
			},
			(error: HttpErrorResponse) => {
				console.log(error.message);
			}
		);

		this.fournisseurService.getFournisseurs().then(
			(response) => {
				const data = response.rows.map((e:any) => {
					const data = e.doc
					data._id = e.doc._id;
					return data;
				})
				this.fournisseurs = data;
			},
			(error: HttpErrorResponse) => {
				console.log(error.message);
			}
		);

		this.settingsService
			.getSettings().then((response) => {
				this.settings = response as Settings;
			});
	}

	AddDialog() {
		const dialogRef = this.dialog.open(AddArticleDocumentComponent);
		dialogRef.afterClosed().subscribe((result: ArticleDocument) => {
			if (result) {
				console.log(result);
				if (!result.remise) result.remise = 0;
				// this.articleDocument.data.push(result);
				result.montant_ht = result.puht * result.quantite;
				if (result.article.tva != undefined) {
					result.puttc = 0;
					result.puttc =
						result.puht * result.article.tva.base + result.puht;
				} else result.puttc = result.puht;
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

	numberOnly(event): boolean {
		const charCode = event.which ? event.which : event.keyCode;
		return (charCode > 47 && charCode < 58) || charCode == 46;
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
			this.document.tva = tva;
		});
	}
}
