import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DocumentService} from "../../_services/document.service";
import {Document} from "../../_models/Document";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {AddFournisseurComponent} from "../../fournisseur-components/add-fournisseur/add-fournisseur.component";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmModalComponent} from "../../confirm-modal/confirm-modal.component";

@Component({
	selector: 'app-document',
	templateUrl: './document.component.html',
	styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit, AfterViewInit {
	type: string;
	trans: string;
	typeShow: string;
	transShow: string;
	documents: MatTableDataSource<Document> = new MatTableDataSource<Document>();
	displayedColumns: string[] = [];
	selectedRowIndex = -1;

	constructor(private activatedRoute: ActivatedRoute, private documentService: DocumentService, public dialog: MatDialog) {
	}

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatPaginator) sort: MatSort;


	ngAfterViewInit() {
		this.getDocuments();
	}

	getDocuments() {
		this.documentService.getDocuments(this.type, this.trans).subscribe(
			(response) => {
				this.documents = new MatTableDataSource<Document>(response);
				this.documents.paginator = this.paginator;
				this.documents.sort = this.sort;
			}, (error) => {
				console.log(error);
			}
		)
	}

	ngOnInit(): void {
		// @ts-ignore
		this.type = this.activatedRoute.snapshot.paramMap.get('type');
		// @ts-ignore
		this.trans = this.activatedRoute.snapshot.paramMap.get('trans');
		if (this.trans == 'vente') this.displayedColumns = ['ID', 'client', 'date', 'montant', 'action'];
		if (this.trans == 'achat') this.displayedColumns = ['ID', 'fournisseur', 'date', 'montant', 'action'];


		if (this.type == 'bl') {
			this.typeShow = "BL";
		} else if (this.type == 'bl_facture') {
			this.typeShow = "BL Facturé";
		} else this.typeShow = this.type
		this.transShow = this.trans;
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.documents.filter = filterValue.trim().toLowerCase();

		if (this.documents.paginator) {
			this.documents.paginator.firstPage();
		}
	}


	AddDialog() {

	}

	delete(id: number) {
		const dialogRef = this.dialog.open(ConfirmModalComponent , {
			data: {message: 'Êtes-vous sûr de vouloir supprimer le document '+ id +' ?'}
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.documentService.deleteDocument(id).subscribe(
					() => {
						this.getDocuments();
					}, (error) => {
						console.log(error.message)
					}
				)
			}
		});
	}

}
