import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Client} from "../../_models/Client";
import {MatPaginator} from "@angular/material/paginator";
import {ClientService} from "../../_services/client.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {HttpErrorResponse} from "@angular/common/http";
import {AddClientComponent} from "../../client-components/add-client/add-client.component";
import {Fournisseur} from "../../_models/Fournisseur";
import {FournisseurService} from "../../_services/fournisseur.service";
import {AddFournisseurComponent} from "../add-fournisseur/add-fournisseur.component";
import {ConfirmModalComponent} from "../../confirm-modal/confirm-modal.component";

@Component({
	selector: 'app-fournisseur',
	templateUrl: './fournisseur.component.html',
	styleUrls: ['./fournisseur.component.css']
})
export class FournisseurComponent {
	fournisseurs: MatTableDataSource<Fournisseur> = new MatTableDataSource<Fournisseur>();

	displayedColumns: string[] = [ 'raison', 'email', 'adresse', 'fax', 'telephone', 'mobile', 'fodec', 'HT/TTC', 'action'];

	@ViewChild(MatPaginator) paginator: MatPaginator;

	ngAfterViewInit() {
		this.getFournisseurs();

	}

	constructor(private fournisseurService: FournisseurService, private router: Router, public dialog: MatDialog) {
	}

	public getFournisseurs(): void {
		this.fournisseurService.getFournisseurs().subscribe(
			(response) => {
				const data = response.map((e:any) => {
					const data = e.payload.doc.data();
					data.id = e.payload.doc.id;
					return data;
				})
				this.fournisseurs = new MatTableDataSource<Fournisseur>(data);
				this.fournisseurs.paginator = this.paginator;
			}, (error: HttpErrorResponse) => {
				// alert(error.message)
			}
		)
	}

	ngOnInit(): void {

	}

	AddDialog() {
		const dialogRef = this.dialog.open(AddFournisseurComponent);

		dialogRef.afterClosed().subscribe(result => {
			this.getFournisseurs();
		});
	}

	delete(id: number,reference : string) {
		const dialogRef = this.dialog.open(ConfirmModalComponent, {
			data: {message: 'Êtes-vous sûr de vouloir supprimer le fournisseur ' + reference + ' ?'}
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.fournisseurService.deleteFournisseur(id);
			}
		});
	}
}
