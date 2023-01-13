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

@Component({
	selector: 'app-fournisseur',
	templateUrl: './fournisseur.component.html',
	styleUrls: ['./fournisseur.component.css']
})
export class FournisseurComponent {
	fournisseurs: MatTableDataSource<Fournisseur> = new MatTableDataSource<Fournisseur>();

	displayedColumns: string[] = ['ID', 'raison', 'email', 'adresse', 'fax', 'telephone', 'mobile', 'fodec', 'HT/TTC', 'action'];

	@ViewChild(MatPaginator) paginator: MatPaginator;

	ngAfterViewInit() {
		this.getFournisseurs();

	}

	constructor(private fournisseurService: FournisseurService, private router: Router, public dialog: MatDialog) {
	}

	public getFournisseurs(): void {
		this.fournisseurService.getFournisseurs().subscribe(
			(response: Fournisseur[]) => {
				this.fournisseurs = new MatTableDataSource<Fournisseur>(response);
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
}
