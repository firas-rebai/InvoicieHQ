import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DocumentService} from "../../_services/document.service";
import {Document} from "../../_models/Document";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";

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
  documents: MatTableDataSource<Document>;
  displayedColumns: string[] = [];
  selectedRowIndex = -1;

  constructor(private activatedRoute: ActivatedRoute, private documentService: DocumentService) {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatPaginator) sort: MatSort;


  ngAfterViewInit() {
    this.documents.paginator = this.paginator;
    this.documents.sort = this.sort;
  }

  ngOnInit(): void {
    // @ts-ignore
    this.type = this.activatedRoute.snapshot.paramMap.get('type');
    // @ts-ignore
    this.trans = this.activatedRoute.snapshot.paramMap.get('trans');
    if (this.trans == 'vente') this.displayedColumns = ['ID', 'client', 'date', 'montant', 'action'];
    if (this.trans == 'achat') this.displayedColumns = ['ID', 'fournisseur', 'date', 'montant', 'action'];

    this.documentService.getDocuments(this.type, this.trans).subscribe(
      (response) => {
        this.documents = new MatTableDataSource<Document>(response);
      }, (error) => {
        console.log(error);
      }
    )
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
}
