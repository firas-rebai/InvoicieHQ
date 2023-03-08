import { ParameterService } from './../_services/parameter.service';
import { DocumentService } from './../_services/document.service';
import { Document } from './../_models/Document';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { ArticleDocument } from '../_models/ArticleDocument';
import { Settings } from '../_models/Settings';

@Component({
	selector: 'app-document-details',
	templateUrl: './document-details.component.html',
	styleUrls: ['./document-details.component.css'],
})
export class DocumentDetailsComponent implements OnInit {
	document: Document;
	@ViewChild(MatTable) table: MatTable<ArticleDocument>;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	montant_total: number = 0;
	montant_remise: number = 0;
	montant_ttc: number = 0;
	net_payer: number = 0;
	settings : Settings;

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
	];

	constructor(
		private activatedRoute: ActivatedRoute,
		private documentService: DocumentService,
		private parameterService : ParameterService
	) {}

	ngOnInit(): void {
		const id = this.activatedRoute.snapshot.paramMap.get('id');
		if (id != null) {
			this.documentService.getDocumentId(parseInt(id)).subscribe(
				(result) => {
					this.document = result;
					this.parameterService.getSettings().subscribe(
						(response) => {
							this.settings = response;
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
		this.document.articleDocument.forEach((article) => {
			var ht = article.puht * article.quantite;
			this.montant_total += ht;
			this.montant_ttc += (parseFloat(article.tva.base) / 100) * article.puht * article.quantite;
			this.montant_remise += (ht + (ht * (parseFloat(article.tva.base) / 100))) * (article.remise / 100);
			this.net_payer = this.montant_total + this.montant_ttc - this.montant_remise + this.settings.timbre;
		});
	}

	changeType() {
		console.log(this.document)
		this.documentService.updateDocumentType(this.document.id , this.document.type).subscribe(
			(result) => {
				this.document = result;
			}, (error) => {
				console.log(error)
			}
		)
	}



}
