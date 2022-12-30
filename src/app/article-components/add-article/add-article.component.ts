import { Component } from '@angular/core';
import {Client} from "../../_models/Client";
import {Assujetti} from "../../_models/Assujetti";
import {TVA} from "../../_models/TVA";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ClientService} from "../../_services/client.service";
import {ParamService} from "../../_services/param.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Article} from "../../_models/Article";
import {ArticleService} from "../../_services/article.service";
import {FamilleArticle} from "../../_models/FamilleArticle";
import {Fournisseur} from "../../_models/Fournisseur";
import {Unite} from "../../_models/Unite";

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent {
  article : Article;
  selectedTVA: TVA;
  selectedFamille : FamilleArticle;
  selectedUnite: Unite;
  selectedFournisseur: Fournisseur;
  tvas: TVA[];
  familles: FamilleArticle[];
  fournisseurs: Fournisseur[];
  unites: Unite[];

  public articleForm = new FormGroup(
    {
      designation : new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9\' ]{2,30}$')]),
      stock : new FormControl('', []),
      date : new FormControl('', []),
      pvht : new FormControl('', []),
      paht : new FormControl('', [])
    }
  )


  get designation() {
    return this.articleForm.controls['designation']
  }

  constructor(private articleService: ArticleService, private paramService: ParamService) {
  }



  public add(addForm: FormGroup): void {
    if (addForm.invalid) return;
    this.article = addForm.value;
    this.article.tva = this.selectedTVA

    this.articleService.addArticle(this.article).subscribe(
      (response :Article) => {
        console.log(response);
      }, (error) => {
        console.log("error : " + error.message);
      }
    )
  }



  public getTVAs(): void {
    this.paramService.getTVAs().subscribe(
      (response: TVA[]) => {
        this.tvas = response;
      }, (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    )
  }

  ngOnInit(): void {
    this.getTVAs();
  }
}
