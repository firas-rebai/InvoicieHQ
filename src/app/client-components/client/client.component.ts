import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ClientService} from "../../_services/client.service";
import {Router} from "@angular/router";
import {Client} from "../../_models/Client";
import {HttpErrorResponse} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {AddClientComponent} from "../add-client/add-client.component";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmModalComponent} from "../../confirm-modal/confirm-modal.component";

@Component({
	selector: 'app-client',
	templateUrl: './client.component.html',
	styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit, AfterViewInit {

	clients: MatTableDataSource<Client>;

	displayedColumns: string[] = [ 'raison', 'email', 'adresse', 'assujetti', 'fax', 'telephone', 'action'];

	@ViewChild(MatPaginator) paginator: MatPaginator;

	ngAfterViewInit() {
		this.getClients();
	}

	constructor(private clientService: ClientService, private router: Router, public dialog: MatDialog) {
	}

	public getClients(): void {
		this.clientService.getClients().then(
			(response) => {
				const data = response.rows.map((e:any) => {
					const data = e.doc;
					data._id = e.doc._id;
					return data;
				})
				this.clients = new MatTableDataSource<Client>(data);
				this.clients.paginator = this.paginator;
			}, (error: HttpErrorResponse) => {
				// alert(error.message)
			}
		)
	}

	ngOnInit(): void {

	}

	AddDialog() {
		const dialogRef = this.dialog.open(AddClientComponent);

		dialogRef.afterClosed().subscribe(result => {
			this.getClients()
		});
	}
	delete(id: string,reference : string) {
		const dialogRef = this.dialog.open(ConfirmModalComponent, {
			data: {message: 'Êtes-vous sûr de vouloir supprimer le client ' + reference + ' ?'}
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.clientService.deleteClient(id).then(result => {
					this.getClients()
				});
			}
		});
	}
}
