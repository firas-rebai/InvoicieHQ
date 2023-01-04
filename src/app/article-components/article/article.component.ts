import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Client} from "../../_models/Client";
import {MatPaginator} from "@angular/material/paginator";
import {ClientService} from "../../_services/client.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {HttpErrorResponse} from "@angular/common/http";
import {AddClientComponent} from "../../client-components/add-client/add-client.component";
import {Article} from "../../_models/Article";
import {ArticleService} from "../../_services/article.service";
import {AddArticleComponent} from "../add-article/add-article.component";

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

  }

  constructor(private articleService: ArticleService, private router: Router, public dialog: MatDialog) {
  }

  public getArticles(): void {
    this.articleService.getArticles().subscribe(
      (response: Article[]) => {
        this.articles = new MatTableDataSource<Article>(response);
		console.log(response)
      }, (error: HttpErrorResponse) => {
        // alert(error.message)
      }
    )
  }

  ngOnInit(): void {
    this.getArticles();
    this.articles.paginator = this.paginator;
  }

  AddDialog() {
    const dialogRef = this.dialog.open(AddArticleComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.getArticles()
    });
  }
}
