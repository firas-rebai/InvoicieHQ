import { GeneratePdfService } from './../_services/generate-pdf.service';
import { ParameterService } from './../_services/parameter.service';
import { DocumentService } from './../_services/document.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { ArticleDocument } from '../_models/ArticleDocument';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
	selector: 'app-document-details',
	templateUrl: './document-details.component.html',
	styleUrls: ['./document-details.component.css'],
})
export class DocumentDetailsComponent implements OnInit {
	document: any;
	@ViewChild(MatTable) table: MatTable<ArticleDocument>;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	montant_total: number = 0;
	montant_remise: number = 0;
	montant_ttc: number = 0;
	net_payer: number = 0;
	settings : any;
	id;
	displayedColumns: string[] = [
		'designation',
		'quantite',
		'unite',
		'puht',
		'puttc',
		'remise',
		'montant',
		'montant_ttc',
	];

	constructor(
		private activatedRoute: ActivatedRoute,
		private documentService: DocumentService,
		private parameterService : ParameterService,
		private pdfGeneratorService: GeneratePdfService,
		private store : AngularFirestore
	) {}

	ngOnInit(): void {
		this.id = this.activatedRoute.snapshot.paramMap.get('id');

		if (this.id != null) {
			this.documentService.getDocumentId(this.id).subscribe(
				(response) => {

					this.document = response.payload.data();
					this.parameterService.getSettings().snapshotChanges().subscribe(
						(response) => {
							this.settings = response.payload.data();
							this.calculate();
						}
					)

				},
				(error) => {
					console.log(error);
				}
			);
		}


	}


	print () {
		this.documentService.generatePDF(this.document.id).subscribe(
			(response) => {
				const file = new Blob([response], { type: 'application/pdf' });
				const pdf = URL.createObjectURL(file);
				// this.pdf = 'data:application/pdf;base64,' + file.text;
				window.open(pdf);
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
		this.net_payer = 0
		this.document.articleDocument.forEach((article) => {
			var ht = article.puht * article.quantite;
			this.montant_total += ht * (1 - (article.remise / 100));
			this.montant_ttc += (parseFloat(this.document.tva.base) / 100) * (ht * (1 - (article.remise / 100)));
			this.montant_remise += ht * (article.remise / 100);

		});
		this.net_payer = this.montant_total + this.montant_ttc  + parseFloat(this.settings.timbre);
	}

	changeType() {
		this.store.doc("/document/" + this.id).update(this.document)
	}



	downloadPDF() {
		return this.pdfGeneratorService.downloadInvoice(this.document, true);
	}

	downloadPDFnoRemise() {
		return this.pdfGeneratorService.downloadInvoice(this.document, false);
	}
}
