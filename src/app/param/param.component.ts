import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Client} from "../_models/Client";
import {TVA} from "../_models/TVA";
import {Unite} from "../_models/Unite";
import {Assujetti} from "../_models/Assujetti";
import {HttpErrorResponse} from "@angular/common/http";
import {ParamService} from "../_services/param.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmModalComponent} from "../confirm-modal/confirm-modal.component";

@Component({
  selector: 'app-param',
  templateUrl: './param.component.html',
  styleUrls: ['./param.component.css']
})
export class ParamComponent implements OnInit {
  assujettis: MatTableDataSource<Assujetti>;
  unites: MatTableDataSource<Unite>;
  tvas: MatTableDataSource<TVA>;

  assujettiColumns: string[] = ['type', 'coef', 'action'];
  TVAColumns: string[] = ['ID', 'base', 'action'];
  uniteColumns: string[] = ['ID', 'unite', 'action'];

  constructor(private paramService: ParamService, public dialog: MatDialog) {
  }


  ngOnInit(): void {
    this.getTVAs();
    this.getUnites();
    this.getAssujettis();
  }

  public getTVAs(): void {
    this.paramService.getTVAs().subscribe(
      (response: TVA[]) => {
        this.tvas = new MatTableDataSource<TVA>(response);
      }, (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public getUnites(): void {
    this.paramService.getUnites().subscribe(
      (response: Unite[]) => {
        this.unites = new MatTableDataSource<Unite>(response);
      }, (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public getAssujettis(): void {
    this.paramService.getAssujettis().subscribe(
      (response: Assujetti[]) => {
        this.assujettis = new MatTableDataSource<Assujetti>(response);
      }, (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  deleteAssujetti(id: number, nom: string) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {message: 'Confirmer supprimer ' + nom}
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.paramService.deleteAssujetti(id).subscribe(
          () => {
            this.getAssujettis();
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        )
      }
    });
  }

  deleteUnite(id: number, nom: string) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {message: 'Confirmer supprimer ' + nom}
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.paramService.deleteUnite(id).subscribe(
          () => {
            this.getAssujettis();
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        )
      }
    });
  }

  deleteTVA(id: number, nom: string) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {message: 'Confirmer supprimer ' + nom}
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.paramService.deleteTVA(id).subscribe(
          () => {
            this.getAssujettis();
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        )
      }
    });
  }



}
