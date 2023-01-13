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

@Component({
	selector: 'app-article',
	templateUrl: './article.component.html',
	styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit, AfterViewInit {
	articles: MatTableDataSource<Article> = new MatTableDataSource<Article>();

	displayedColumns: string[] = ['ID', 'designation', 'stock', 'unite', 'date', 'PAHT', 'PVHT', 'famille', 'fournisseur', 'TVA', 'action'];

	@ViewChild(MatPaginator) paginator: MatPaginator;

	ngAfterViewInit() {
		this.getArticles();
	}

	constructor(private articleService: ArticleService, private router: Router, public dialog: MatDialog) {
	}

	public getArticles(): void {
		this.articleService.getArticles().subscribe(
			(response: Article[]) => {
				this.articles = new MatTableDataSource<Article>(response);
				this.articles.paginator = this.paginator;
				console.log(response)
			}, (error: HttpErrorResponse) => {
				console.log(error.message)
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
}
