import { DocumentDetailsComponent } from './document-details/document-details.component';
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
import {AuthGuard} from "./_services/auth.guard";

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate : [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate : [AuthGuard] },
  { path: 'client', component: ClientComponent, canActivate : [AuthGuard] },
  { path: 'fournisseur', component: FournisseurComponent, canActivate : [AuthGuard] },
  { path: 'document/:trans', component: DocumentComponent, canActivate : [AuthGuard] },
  { path: 'document/details/:id', component: DocumentDetailsComponent, canActivate : [AuthGuard] },
  { path: 'param', component: ParamComponent, canActivate : [AuthGuard] },
  { path: 'add-document', component: AddDocumentComponent, canActivate : [AuthGuard] },
  { path: 'article', component: ArticleComponent, canActivate : [AuthGuard] },
  { path: '**', component: HomeComponent , canActivate : [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
