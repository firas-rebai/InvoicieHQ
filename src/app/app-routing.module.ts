import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {ClientComponent} from "./client-components/client/client.component";
import {ParamComponent} from "./param/param.component";
import {FournisseurComponent} from "./fournisseur-components/fournisseur/fournisseur.component";
import {DocumentComponent} from "./document-components/document/document.component";
import {ArticleComponent} from "./article-components/article/article.component";
import {AddDocumentComponent} from "./document-components/add-document/add-document.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'client', component: ClientComponent },
  { path: 'fournisseur', component: FournisseurComponent },
  { path: 'document/:trans', component: DocumentComponent },
  { path: 'param', component: ParamComponent },
  { path: 'add-document', component: AddDocumentComponent },
  { path: 'article', component: ArticleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
