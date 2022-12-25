import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DocumentService} from "../_services/document.service";
import {Document} from "../_models/Document";

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  type: string | null;
  trans: string | null;
  documents : Document[];
  displayedColumns: string[] = ['ID', 'raison', 'email', 'adresse', 'assujetti', 'fax', 'telephone', 'action'];

  constructor(private activatedRoute: ActivatedRoute, private documentService : DocumentService) {
  }

  ngOnInit(): void {
    this.type = this.activatedRoute.snapshot.paramMap.get('type');
    this.trans = this.activatedRoute.snapshot.paramMap.get('trans');
    if (this.trans == 'vente')   this.displayedColumns = ['ID', 'client', 'date', 'montant', 'action'];
    if (this.trans == 'achat')   this.displayedColumns = ['ID', 'founisseur', 'date', 'montant', 'action'];

    this.documentService.getDocuments(this.type,this.trans).subscribe(
      (response)=> {
        this.documents = response;
      },(error) =>{
        console.log(error);
      }
    )

  }

  AddDialog() {

  }
}
