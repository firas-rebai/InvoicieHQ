import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {HttpErrorResponse} from "@angular/common/http";
import {Article} from "../../_models/Article";
import {ArticleService} from "../../_services/article.service";
import {AddArticleComponent} from "../add-article/add-article.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConfirmModalComponent} from "../../confirm-modal/confirm-modal.component";
import { Timestamp } from '@angular/fire/firestore';

@Component({
	selector: 'app-article',
	templateUrl: './article.component.html',
	styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit, AfterViewInit {
	articles: MatTableDataSource<Article> = new MatTableDataSource<Article>();

	displayedColumns: string[] = ['designation', 'stock', 'unite', 'date', 'PAHT', 'PVHT', 'famille', 'fournisseur',  'action'];

	@ViewChild(MatPaginator) paginator: MatPaginator;

	ngAfterViewInit() {
		this.getArticles();
	}

	constructor(private articleService: ArticleService, private router: Router, public dialog: MatDialog) {
	}

	public getArticles(): void {
		this.articleService.getArticles().subscribe(
			(response) => {
				const data = response.map((e:any) => {
					const data = e.payload.doc.data();
					Object.keys(data).filter(key => data[key] instanceof Timestamp)
                        .forEach(key => data[key] = data[key].toDate())
					data.id = e.payload.doc.id;
					return data;
				})
				this.articles = new MatTableDataSource<Article>(data);
				this.articles.paginator = this.paginator;
			}, (error) => {
				console.log(error)
			}
		)
	}

	ngOnInit(): void {


	}

	AddDialog() {
		const dialogRef = this.dialog.open(AddArticleComponent);

		dialogRef.afterClosed().subscribe(() => {
			this.getArticles()
		});
	}
	delete(id: number,reference : string) {
		const dialogRef = this.dialog.open(ConfirmModalComponent, {
			data: {message: 'Êtes-vous sûr de vouloir supprimer l\'article ' + reference + ' ?'}
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.articleService.deleteArticle(id);
			}
		});
	}
}
