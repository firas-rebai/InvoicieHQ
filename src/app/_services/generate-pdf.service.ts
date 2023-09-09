import { Document } from './../_models/Document';
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ArticleDocument } from '../_models/ArticleDocument';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { DatePipe } from '@angular/common';
import { Settings } from '../_models/Settings';
import { DecimalPipe } from '@angular/common';



@Injectable({
	providedIn: 'root',
})
export class GeneratePdfService {
	constructor(
		private store: AngularFirestore,
		private storage: AngularFireStorage,
		private decimalPipe: DecimalPipe
	) {}
	settings: any;
	total_ht: number;
	total_tva: number;
	timbre: number;
	net_payer: number;

	writtenNumberFrench(num : number) {
		let units = ["", "Un", "Deux", "Trois", "Quatre", "Cinq", "Six", "Sept", "Huit", "Neuf", "Dix", "Onze", "Douze", "Treize", "Quatorze", "Quinze", "Seize", "Dix-sept", "Dix-huit", "Dix-neuf"];
		let tens = ["", "Dix", "Vingt", "Trente", "Quarante", "Cinquante", "Soixante", "Soixante", "Quatre-vingt", "Quatre-vingt"];
		let hundreds = ["", "Cent", "Deux-cents", "Trois-cents", "Quatre-cents", "Cinq-cents", "Six-cents", "Sept-cents", "Huit-cents", "Neuf-cents"];



		if (num < 20) {
            return units[Math.floor(num)];
        } else if (num < 100) {
            if (num < 60)
                return tens[Math.floor(num / 10)] + (num % 10 == 0 ? "" : "-" + units[Math.floor(num % 10)]);
            else if (num < 80)
                return tens[Math.floor(num / 10)] + (num % 10 == 0 ? "" : "-" + units[Math.floor(num - 60)]);
            else
                return tens[Math.floor(num / 10)] + (num % 10 == 0 ? "" : "-" + units[Math.floor(num - 80)]);
        } else if (num < 1000) {
            return hundreds[Math.floor(num / 100)] + (num % 100 == 0 ? "" : " " + this.writtenNumberFrench(num % 100));
        } else if (num < 1000000) {
            return this.writtenNumberFrench(num / 1000) + " Mille" + (num % 1000 == 0 ? "" : " " + this.writtenNumberFrench(num % 1000));
        } else {
            return "bigger than 1000000";
        }
	}

	flattenObject(obj, prefix = '') {
		const flattenedObject = {};

		for (let key in obj) {
			if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
				const nestedObject = this.flattenObject(
					obj[key],
					prefix + key + '.'
				);
				Object.assign(flattenedObject, nestedObject);
			} else {
				flattenedObject[prefix + key] = obj[key];
			}
		}

		return flattenedObject;
	}

	downloadInvoice(d: Document, remise : boolean) {
		let total_ht = 0
		let total_tva = 0
		let net_payer = 0
		let remise_ttc = 0
		let montant_remise = 0
		let body;
		let columns;

		let document = structuredClone(d);



		document.articleDocument.forEach(article => {
			var ht = article.puht * article.quantite;
			total_ht += ht ;
			total_tva += (document.tva.base / 100) * (ht * (1 - (article.remise / 100)));
			montant_remise += ht * (article.remise / 100);

		})




		let rest = 0


		const doc = new jsPDF();


		if (document.articleDocument.length < 11) {
			let n = 10 - document.articleDocument.length
			for (let i=0;i <= n; i++) {
				document.articleDocument.push(new ArticleDocument())
			}
		}
		const values = document.articleDocument.map((element) => {
			return this.flattenObject(element);
		});
		// import the settings
		const datepipe: DatePipe = new DatePipe('en-US')
		let formattedDate = datepipe.transform(document.date, 'dd-MM-YYYY')
		this.store.collection('settings').doc('1').snapshotChanges().subscribe((response) => {

		this.settings = response.payload.data() as Settings;
		net_payer = total_ht +  total_tva + parseFloat(this.settings.timbre) - montant_remise;
		rest = net_payer - Math.floor(net_payer);


		let type = document.type;
		if (type == 'bl') {
			type = 'Bon de Livraison'
		} else if (type == 'bl_facture') {
			type = 'Bon de Livraison Facturé'
		}

		if(remise) {

			columns = [
				{
					header: 'Designation',
					dataKey: 'article.designation',
				},
				{ header: 'Quantité', dataKey: 'quantite' },
				{ header: 'Unité', dataKey: 'article.unite.unite' },
				{ header: 'PUHT', dataKey: 'puht' },
				{ header: 'Montant HT', dataKey: 'montant_ht' },
			]
			body = [
				[
					{
						content: 'Total HT:  ' + (this.decimalPipe.transform(total_ht, '1.2-3') ?? '0'),
						styles: {
							halign: 'left',
							cellPadding: {left: 120, bottom: 1}
						},
					}
				],
				[
					{
						content: 'Total TVA:  ' + (this.decimalPipe.transform(total_tva, '1.2-3') ?? '0'),
						styles: {
							halign: 'left',
							cellPadding: {left: 120, bottom: 1}
						},
					}
				],
				[
					{
						content: 'Timbre:  ' + (this.decimalPipe.transform(this.settings.timbre, '1.3-3') ?? '0'),
						styles: {
							halign: 'left',
							cellPadding: {left: 120, bottom: 1}
						},
					}
				],
				[
					{
						content: 'Net à payer:  ' + (this.decimalPipe.transform(total_ht +  total_tva - montant_remise + parseFloat(this.settings.timbre), '1.2-3') ?? '0'),
						styles: {
							halign: 'left',
							cellPadding: {left: 120, bottom: 1}
						},
					}
				],[
					{
						content: 'Arreté la présente piece la somme de :',
						styles: {
							halign: 'left',
							fontSize: 12,

						},
					},
				],
				[
					{
						content:
							this.writtenNumberFrench(net_payer) + " Dinars et " + Math.round((net_payer - Math.floor(net_payer)) * 1000)  +" Millimes.",
						styles: {
							halign: 'left',
						},
					},
				],
			]
		} else {
			columns = [
				{
					header: 'Designation',
					dataKey: 'article.designation',
				},
				{ header: 'Quantité', dataKey: 'quantite' },
				{ header: 'Unité', dataKey: 'article.unite.unite' },
				{ header: 'PUHT', dataKey: 'puht' },
				{ header: 'Remise %', dataKey: 'remise' },
				{ header: 'Montant HT', dataKey: 'montant_ht' },
			]
			body = [
				[
					{
						content: 'Total HT:  ' + (this.decimalPipe.transform(total_ht, '1.2-3') ?? '0'),
						styles: {
							halign: 'left',
							cellPadding: {left: 120, bottom: 1}
						},
					}
				],
				[
					{
						content: 'Total TVA:  ' + (this.decimalPipe.transform(total_tva, '1.2-3') ?? '0'),
						styles: {
							halign: 'left',
							cellPadding: {left: 120, bottom: 1}
						},
					}
				],

				[
					{
						content: 'Total Remise:  ' + (this.decimalPipe.transform(montant_remise, '1.2-3') ?? '0'),
						styles: {
							halign: 'left',
							cellPadding: {left: 120, bottom: 1}
						},
					}
				],
				[
					{
						content: 'Timbre:  ' + (this.decimalPipe.transform(this.settings.timbre, '1.3-3') ?? '0'),
						styles: {
							halign: 'left',
							cellPadding: {left: 120, bottom: 1}
						},
					}
				],
				[
					{
						content: 'Net à payer:  ' + (this.decimalPipe.transform(total_ht +  total_tva + parseFloat(this.settings.timbre) - remise_ttc, '1.2-3') ?? '0'),
						styles: {
							halign: 'left',
							cellPadding: {left: 120, bottom: 1}
						},
					}
				],[
					{
						content: 'Arreté la présente piece la somme de :',
						styles: {
							halign: 'left',
							fontSize: 12,

						},
					},
				],
				[
					{
						content:
							this.writtenNumberFrench(net_payer) + " Dinars et " + Math.round((net_payer - Math.floor(net_payer)) * 1000)  +" Millimes.",
						styles: {
							halign: 'left',
						},
					},
				],
			]
		}




		let benifactorText = '';
		if (document.transaction == "vente") {
			benifactorText =
			'Client :' + '\n' +
			'\nRaison Social : '  + document.client?.raison_social +
			'\nAdresse : ' + document.client?.adresse +
			'\nTelephone : ' + document.client?.telephone +
			'\nEmail : ' + document.client?.email
		}else {
			benifactorText =
			'Fournisseur :' + '\n' +
			'\nRaison Social : '  + document.fournisseur?.raison_social +
			'\nAdresse : ' + document.fournisseur?.adresse +
			'\nTelephone : ' + document.fournisseur?.telephone +
			'\nEmail : ' + document.fournisseur?.email
		}


		// generate the pdf
		this.storage
			.ref('logo')
			.getDownloadURL()
			.subscribe((response) => {
				doc.addImage(response, 'JPEG', 10, 10, 70, 30);
				autoTable(doc, {
					body: [
						[
							{
								content: this.settings.raison_social,
								styles: {
									fontSize: 15,
									cellPadding: {top: 30},
									fontStyle :'bold'
								},
							},
							{
								content: type[0].toUpperCase() + type.slice(1),
								styles: {
									halign: 'right',
									fontSize: 20,
									fontStyle: 'bold'
								},
							},{
								content:
									'Reference: ' + document.id +
									'\nDate: ' + formattedDate ,
								styles: {
									halign: 'right'
								},
							},
						],
					],
					theme: 'plain',

				});

				/* autoTable(doc, {
					body: [
						[
							{
								content:
									'Reference: ' + document.id +
									'\nDate: ' + formattedDate ,
								styles: {
									halign: 'right',

								},
							},
						],
					],
					theme: 'plain',
				}); */

				autoTable(doc, {
					body: [
						[
							{
								content:
									benifactorText,
								styles: {
									halign: 'left',
									fontStyle : 'bolditalic'
								},
							},
						],
					],
					theme: 'plain',
				});


				autoTable(doc, {
					body: [
						[
							{
								content: 'Produits & Services',
								styles: {
									halign: 'left',
									fontSize: 12,
								},
							},
						],
					],
					theme: 'plain',
				});



				autoTable(doc, {
					body: values,
					columns: columns,
					theme: 'grid',
					headStyles: {
						fillColor: '#343a40',
					},
				});



				autoTable(doc, {
					head: [
						["Transport : " + (document.transport ?? "0.0") + " dt", "Installation : " + (document.installation ?? "0.0") + ' dt'],
				],
				   //startY: 210,
					theme: 'striped',
					headStyles: {
						fillColor: '#343a40',
					},
				})

				autoTable(doc, {
					body: body,
					theme: 'plain',
				});

				autoTable(doc, {
					body: [
						[
							{
								content:
									this.settings.registre_commerce +
									'' +
									' / Adresse : ' + this.settings.adresse +
									' / Mobile : ' + this.settings.mobile +
									' / Fax : ' + this.settings.fax +
									' / RIB : ' + this.settings.RIB,
								styles: {
									halign: 'center',
								},
							}
						],
					],
					theme: 'plain',
				});

				window.open(URL.createObjectURL(doc.output("blob")));
			});
		});
	}
}
