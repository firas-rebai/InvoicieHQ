import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ArticleService} from "../../_services/article.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ArticleDocument} from "../../_models/ArticleDocument";
import {AddArticleDocumentComponent} from "../../add-article-document/add-article-document.component";
import {Document} from "../../_models/Document";
import {Fournisseur} from "../../_models/Fournisseur";
import {Client} from "../../_models/Client";
import {ClientService} from "../../_services/client.service";
import {FournisseurService} from "../../_services/fournisseur.service";
import {HttpErrorResponse} from "@angular/common/http";
import {AddFournisseurComponent} from "../../fournisseur-components/add-fournisseur/add-fournisseur.component";
import {AddClientComponent} from "../../client-components/add-client/add-client.component";
import {TokenStorageService} from "../../_services/token-storage.service";

@Component({
	selector: 'app-add-document',
	templateUrl: './add-document.component.html',
	styleUrls: ['./add-document.component.css']
})
export class AddDocumentComponent implements OnInit, AfterViewInit {
	articleDocument: MatTableDataSource<ArticleDocument> = new MatTableDataSource<ArticleDocument>();
	document: Document = new Document();
	displayedColumns: string[] = ['ID', 'designation', 'quantite', 'unite', 'puht', 'tva', 'puttc', 'remise', 'pu_reel', 'montant', 'action'];
	fournisseurs: Fournisseur[];
	clients: Client[];

	@ViewChild(MatPaginator) paginator: MatPaginator;
	montant_total: number = 10;

	ngAfterViewInit() {
		this.articleDocument.paginator = this.paginator;
	}

	constructor(private articleService: ArticleService,
				private clientService: ClientService,
				private fournisseurService: FournisseurService,
				private router: Router,
				public dialog: MatDialog,
				private tokenStorage: TokenStorageService) {
	}

	calculate() {
		this.montant_total = 12
	}

	ngOnInit(): void {
		// for (let i = 0; i < 5; i++) this.articleDocument.data.push(Object.create(null));
		this.getData();
	}

	getData() {
		this.clientService.getClients().subscribe(
			(result: Client[]) => {
				this.clients = result;
			}, (error: HttpErrorResponse) => {
				console.log(error.message);
			}
		)

		this.fournisseurService.getFournisseurs().subscribe(
			(result) => {
				this.fournisseurs = result;
			}, (error: HttpErrorResponse) => {
				console.log(error.message)
			}
		)

	}

	AddDialog() {
		const dialogRef = this.dialog.open(AddArticleDocumentComponent);

		dialogRef.afterClosed().subscribe((result: ArticleDocument) => {
			this.articleDocument.data.push(result);
			this.calculate();
		});
	}

	AddClient() {
		const dialogRef = this.dialog.open(AddClientComponent);

		dialogRef.afterClosed().subscribe((result: Client) => {
			this.document.client = result;
			this.document.fournisseur = null;
		});
	}

	AddFournisseur() {
		const dialogRef = this.dialog.open(AddFournisseurComponent);

		dialogRef.afterClosed().subscribe((result: Fournisseur) => {
			this.document.fournisseur = result;
			this.document.client = null;

		});
	}
}
