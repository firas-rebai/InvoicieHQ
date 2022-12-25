import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {ClientComponent} from "./client/client.component";
import {ParamComponent} from "./param/param.component";
import {FournisseurComponent} from "./fournisseur/fournisseur.component";
import {DocumentComponent} from "./document/document.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'client', component: ClientComponent },
  { path: 'fournisseur', component: FournisseurComponent },
  { path: 'document/:type/:trans', component: DocumentComponent },
  { path: 'param', component: ParamComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
