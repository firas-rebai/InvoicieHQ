import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Client} from "../_models/Client";
import {TVA} from "../_models/TVA";
import {Unite} from "../_models/Unite";
import {Assujetti} from "../_models/Assujetti";
import {HttpErrorResponse} from "@angular/common/http";
import {ParamService} from "../_services/param.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmModalComponent} from "../confirm-modal/confirm-modal.component";
import {FamilleArticle} from "../_models/FamilleArticle";
import {AddParamComponent} from "../add-param/add-param.component";

@Component({
	selector: 'app-param',
	templateUrl: './param.component.html',
	styleUrls: ['./param.component.scss']
})
export class ParamComponent implements OnInit {
	assujettis: MatTableDataSource<Assujetti>;
	unites: MatTableDataSource<Unite>;
	tvas: MatTableDataSource<TVA>;
	familles: MatTableDataSource<FamilleArticle>;
	showFiller = false;

	content: string = 'societe';


	assujettiColumns: string[] = ['type', 'coef', 'action'];
	TVAColumns: string[] = ['ID', 'base', 'action'];
	uniteColumns: string[] = ['ID', 'unite', 'action'];
	familleColumns: string[] = ['ID', 'famille', 'action'];

	constructor(private paramService: ParamService, public dialog: MatDialog) {
	}


	ngOnInit(): void {
		this.getTVAs();
		this.getUnites();
		this.getAssujettis();
		this.getFamilles();
	}

	public getTVAs(): void {
		this.paramService.getTVAs().subscribe(
			(response) => {
				const data = response.map((e:any) => {
					const data = e.payload.doc.data();
					data.id = e.payload.doc.id;
					return data;
				})
				this.tvas = new MatTableDataSource<TVA>(data);
			}, (error: HttpErrorResponse) => {
				console.log(error.message)
			}
		)
	}

	public getUnites(): void {
		this.paramService.getUnites().subscribe(
			(response) => {
				const data = response.map((e:any) => {
					const data = e.payload.doc.data();
					data.id = e.payload.doc.id;
					return data;
				})
				this.unites = new MatTableDataSource<Unite>(data);
			}, (error: HttpErrorResponse) => {
				console.log(error.message)
			}
		)
	}

	public getAssujettis(): void {
		/* this.paramService.getAssujettis().subscribe(
			(response: Assujetti[]) => {
				this.assujettis = new MatTableDataSource<Assujetti>(response);
			}, (error: HttpErrorResponse) => {
				console.log(error.message)
			}
		) */
		this.paramService.getAssujettis().subscribe(
			(response) => {
				const data = response.map((e:any) => {
					const data = e.payload.doc.data();
					data.id = e.payload.doc.id;
					return data;
				})
				this.assujettis = new MatTableDataSource<Assujetti>(data);
			},
			(error) => {
				console.log(error.message);
			}
		);
	}

	public getFamilles(): void {
		this.paramService.getFamilles().subscribe(
			(response) => {
				const data = response.map((e:any) => {
					const data = e.payload.doc.data();
					data.id = e.payload.doc.id;
					return data;
				})
				this.familles = new MatTableDataSource<FamilleArticle>(data);
			}, (error: HttpErrorResponse) => {
				console.log(error.message)
			}
		)
	}

	deleteAssujetti(id: string, nom: string) {
		const dialogRef = this.dialog.open(ConfirmModalComponent, {
			data: {message: 'Confirmer supprimer ' + nom}
		});
		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.paramService.deleteAssujetti(id)

			}
		});
	}

	deleteUnite(id: number, nom: string) {
		const dialogRef = this.dialog.open(ConfirmModalComponent, {
			data: {message: 'Confirmer supprimer ' + nom}
		});
		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.paramService.deleteUnite(id)
			}
		});
	}

	deleteTVA(id: number, nom: string) {
		const dialogRef = this.dialog.open(ConfirmModalComponent, {
			data: {message: 'Confirmer supprimer ' + nom}
		});
		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.paramService.deleteTVA(id)
			}
		});
	}

	deleteFamille(id: number, nom: string) {
		const dialogRef = this.dialog.open(ConfirmModalComponent, {
			data: {message: 'Confirmer supprimer ' + nom}
		});
		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.paramService.deleteFamille(id)
			}
		});
	}

	addDialog (message : any) {
		if (!message) return;
		const dialogRef = this.dialog.open(AddParamComponent, {
			data: {message: message}
		});
		dialogRef.afterClosed().subscribe((result : string) => {
			if (message == "tva") {
				result = result.replaceAll("_", ' ')
				result = result.trim()
				// @ts-ignore
				let tva: TVA = {"id": null , "base" : result};
				this.paramService.addTVA(tva)
			}
			if (message == "assujetti") {

				let type = result.split("_")[0]
				let coef = result.split("_")[1]
				// @ts-ignore
				let assujetti : Assujetti = {id : null,type : type , coefficient_tva : coef}
				this.paramService.addAssujetti(assujetti)
			}
			if (message == "famille") {
				result = result.replace('_', ' ')
				result = result.trim()
				// @ts-ignore
				let famille: FamilleArticle = {"id": null , "famille" : result};
				this.paramService.addFamille(famille)
			}
			if (message == "unite") {
				result = result.split("_")[0]
				// @ts-ignore
				let unite: Unite = {"id": null , "unite" : result};
				this.paramService.addUnite(unite)
			}
		});
	}


}
