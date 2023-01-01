import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ArticleService} from "../../_services/article.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ArticleDocument} from "../../_models/ArticleDocument";
import {AddArticleDocumentComponent} from "../../add-article-document/add-article-document.component";

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.css']
})
export class AddDocumentComponent implements OnInit, AfterViewInit {
  articleDocument: MatTableDataSource<ArticleDocument>;

  displayedColumns: string[] = ['ID', 'designation', 'quantite', 'unite', 'puht', 'tva', 'puttc', 'remise', 'pu_reel', 'montant', 'action'];




  @ViewChild(MatPaginator) paginator: MatPaginator;
  montant_total: number = 10;

  ngAfterViewInit() {
    this.articleDocument.paginator = this.paginator;
  }

  constructor(private articleService: ArticleService, private router: Router, public dialog: MatDialog) {
  }

  calculate() {
    this.montant_total = 12
  }

  ngOnInit(): void {

  }

  AddDialog() {
    const dialogRef = this.dialog.open(AddArticleDocumentComponent);

    dialogRef.afterClosed().subscribe((result: ArticleDocument) => {
      this.articleDocument.data.push(result);
      this.calculate();
    });
  }
}
