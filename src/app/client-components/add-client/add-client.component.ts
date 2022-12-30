import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ClientService} from "../../_services/client.service";
import {Client} from "../../_models/Client";
import {Assujetti} from "../../_models/Assujetti";
import {ParamService} from "../../_services/param.service";
import {HttpErrorResponse} from "@angular/common/http";
import {TVA} from "../../_models/TVA";

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit{
  client : Client;
  selectedAssujetti : Assujetti;
  selectedTVA: TVA;
  assujettis: Assujetti[];
  tvas: TVA[];

  public clientForm = new FormGroup(
    {
      raison_social : new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9\' ]{2,30}$')]),
      adresse : new FormControl('', []),
      telephone : new FormControl('', []),
      mobile : new FormControl('', []),
      fax : new FormControl('', []),
      email : new FormControl('',[])
    }
  )


  get raison_social() {
    return this.clientForm.controls['raison_social']
  }

  constructor(private clientService: ClientService, private paramService: ParamService) {
  }



  public add(addForm: FormGroup): void {
    if (addForm.invalid) return;
    this.client = addForm.value;
    this.client.assujetti = this.selectedAssujetti;
    this.client.tva = this.selectedTVA

    this.clientService.addClient(this.client).subscribe(
      (response :Client) => {
        console.log(response);
      }, (error) => {
        console.log("error : " + error.message);
      }
    )
  }

  public getAssujettis(): void {
    this.paramService.getAssujettis().subscribe(
      (response: Assujetti[]) => {
        this.assujettis = response;
      }, (error: HttpErrorResponse) => {
        console.log(error.message)
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
    this.getAssujettis();
    this.getTVAs();
  }
}
