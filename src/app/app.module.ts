import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import { ClientComponent } from './client-components/client/client.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import { ParamComponent } from './param/param.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import { AddClientComponent } from './client-components/add-client/add-client.component';
import { FournisseurComponent } from './fournisseur-components/fournisseur/fournisseur.component';
import { AddFournisseurComponent } from './fournisseur-components/add-fournisseur/add-fournisseur.component';
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDividerModule} from "@angular/material/divider";
import { DocumentComponent } from './document-components/document/document.component';
import {MatSortModule} from "@angular/material/sort";
import { AddDocumentComponent } from './document-components/add-document/add-document.component';
import { ArticleComponent } from './article-components/article/article.component';
import { AddArticleComponent } from './article-components/add-article/add-article.component';
import { ParameterDialogComponent } from './parameter-dialog/parameter-dialog.component';
import { AddArticleDocumentComponent } from './add-article-document/add-article-document.component';
import {MatCardModule} from "@angular/material/card";
import { AddParamComponent } from './add-param/add-param.component';
import { ListArticleComponent } from './list-article/list-article.component';
import {MatListModule} from "@angular/material/list";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ClientComponent,
    ParamComponent,
    ConfirmModalComponent,
    AddClientComponent,
    FournisseurComponent,
    AddFournisseurComponent,
    DocumentComponent,
    AddDocumentComponent,
    ArticleComponent,
    AddArticleComponent,
    ParameterDialogComponent,
    AddArticleDocumentComponent,
    AddParamComponent,
    ListArticleComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        HttpClientModule,
        MatMenuModule,
        MatTableModule,
        MatPaginatorModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatRadioModule,
        MatCheckboxModule,
        MatDividerModule,
        MatSortModule,
        MatCardModule,
        MatListModule,
        MatDatepickerModule,
		MatNativeDateModule
    ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
