import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from '../../_services/document.service';
import { Document } from '../../_models/Document';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../../confirm-modal/confirm-modal.component';
import { DataSharingService } from '../../_services/data-sharing.service';

@Component({
	selector: 'app-document',
	templateUrl: './document.component.html',
	styleUrls: ['./document.component.css'],
})
export class DocumentComponent implements OnInit, AfterViewInit {
	type: string;
	trans: string;
	typeShow: string;
	transShow: string;
	documents: MatTableDataSource<Document> =
		new MatTableDataSource<Document>();
	displayedColumns: string[] = [];
	// selectedRowIndex = -1;

	constructor(
		private activatedRoute: ActivatedRoute,
		private documentService: DocumentService,
		public dialog: MatDialog,
		private dataSharingService: DataSharingService,
		private router : Router
	) {
		this.dataSharingService.trans.subscribe((value: string) => {
			this.trans = value;
			this.transShow = value;
			this.getDocuments();
			if (this.trans == 'vente')
				this.displayedColumns = [
					'ID',
					'client',
					'date',
					'montant',
					'montant_ttc',
					'net_payer',
					'action',
				];
			if (this.trans == 'achat')
				this.displayedColumns = [
					'ID',
					'fournisseur',
					'date',
					'montant',
					'montant_ttc',
					'net_payer',
					'action',
				];
		});
	}

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatPaginator) sort: MatSort;

	ngAfterViewInit() {
		this.getDocuments();
	}

	getDocuments() {
		this.documentService.getDocumentsTrans(this.trans).subscribe(
			(response) => {
				this.documents = new MatTableDataSource<Document>(response);
				this.documents.paginator = this.paginator;
				this.documents.sort = this.sort;
				// console.log(response)
				this.documents.data.forEach((doc) => {
					let montant: number = 0;
					var montant_ttc: number = 0;
					var net_payer: number = 0;
					doc.articleDocument.forEach((article) => {
						montant += article.puht * article.quantite * (article.remise / 100);
						montant_ttc += montant * (Number(article.tva.base) / 100);
						net_payer += montant + montant_ttc;
					});
					doc.montant_ht = montant.toString();
					doc.montant_ttc = montant_ttc.toString();
					doc.net_payer = net_payer.toString();
				});
				//console.log(response);
			},
			(error) => {
				console.log(error);
			}
		);
	}

	ngOnInit(): void {
		// @ts-ignore
		this.trans = this.activatedRoute.snapshot.paramMap.get('trans');
		this.transShow = this.trans;
		if (this.trans == 'vente')
			this.displayedColumns = [
				'ID',
				'client',
				'date',
				'montant',
				'montant_ttc',
				'net_payer',
				'action',
			];
		if (this.trans == 'achat')
			this.displayedColumns = [
				'ID',
				'fournisseur',
				'date',
				'montant',
				'montant_ttc',
				'net_payer',
				'action',
			];
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		//this.documents.filter = filterValue.trim().toLowerCase();
		if (filterValue == '') this.getDocuments()
		this.documents.data = this.documents.data.filter(
			(doc) => {
				return doc.client?.raison_social.trim().toLowerCase().includes(filterValue.trim().toLowerCase()) || doc.fournisseur?.raison_social.trim().toLowerCase().includes(filterValue.trim().toLowerCase())
			}
		)
		if (this.documents.paginator) {
			this.documents.paginator.firstPage();
		}
	}

	applyTypeFilter() {
		const type = this.type.toLowerCase();
		if (type == 'tous') {
			this.getDocuments();
			return;
		}
		this.documentService.getDocumentsType(type, this.trans).subscribe(
			(response) => {
				this.documents = new MatTableDataSource<Document>(response);
				this.documents.paginator = this.paginator;
				this.documents.sort = this.sort;
				this.documents.data.forEach((doc) => {
					var montant: number = 0;
					var montant_ttc: number = 0;
					var net_payer: number = 0;
					doc.articleDocument.forEach((article) => {
						montant += article.quantite * article.puht;
						montant_ttc += montant * (Number(article.tva.base) / 100);
						net_payer += montant + montant_ttc;
					});
					doc.montant_ht = montant.toString();
					doc.montant_ttc = montant_ttc.toString();
					doc.net_payer = net_payer.toString();
				});
				console.log(response);
			},
			(error) => {
				console.log(error);
			}
		);
	}

	AddDialog() {}

	delete(id: number, reference: string) {
		const dialogRef = this.dialog.open(ConfirmModalComponent, {
			data: {
				message:
					'Êtes-vous sûr de vouloir supprimer le document ' +
					reference +
					' ?',
			},
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.documentService.deleteDocument(id).subscribe(
					() => {
						this.getDocuments();
					},
					(error) => {
						console.log(error.message);
					}
				);
			}
		});
	}

	navToDetail (id: number) {
		this.router.navigate(['/document/details/', id])
	}

	openPDF(id: number) {
		this.documentService.generatePDF(id).subscribe(
			(response) => {
				const file = new Blob([response], { type: 'application/pdf' });
				const pdf = URL.createObjectURL(file);
				// this.pdf = 'data:application/pdf;base64,' + file.text;
				window.open(pdf, id.toString());
			},
			(error) => {
				console.log(error);
			}
		);
	}
}
