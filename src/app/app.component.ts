import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AddFournisseurComponent} from "./fournisseur-components/add-fournisseur/add-fournisseur.component";
import {MatDialog} from "@angular/material/dialog";
import {ParameterDialogComponent} from "./parameter-dialog/parameter-dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dhd-frontend-angular';

  constructor(private router: Router,public dialog: MatDialog) {
  }

  openMenu(type: string, trans: string) {

    window.location.href = window.location.protocol + '//' + window.location.host + '/document/' + trans + "/" + type;
  }

  openParam() {
    const dialogRef = this.dialog.open(ParameterDialogComponent);

  }


}
