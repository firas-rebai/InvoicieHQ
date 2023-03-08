import { AddParamComponent } from './../../add-param/add-param.component';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../_services/client.service';
import { Client } from '../../_models/Client';
import { Assujetti } from '../../_models/Assujetti';
import { ParamService } from '../../_services/param.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TVA } from '../../_models/TVA';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-add-client',
	templateUrl: './add-client.component.html',
	styleUrls: ['./add-client.component.css'],
})
export class AddClientComponent implements OnInit {
	client: Client;
	selectedAssujetti: Assujetti;
	selectedTVA: TVA;
	assujettis: Assujetti[];
	tvas: TVA[];

	public clientForm = new FormGroup({
		raison_social: new FormControl('', [
			Validators.required,
			Validators.pattern("^[a-zA-Z0-9' ]{2,30}$"),
		]),
		adresse: new FormControl('', []),
		telephone: new FormControl('', []),
		mobile: new FormControl('', []),
		fax: new FormControl('', []),
		email: new FormControl('', []),
	});

	get raison_social() {
		return this.clientForm.controls['raison_social'];
	}

	constructor(
		private clientService: ClientService,
		private paramService: ParamService,
		public dialogRef: MatDialogRef<AddClientComponent>,
		private dialog: MatDialog
	) {}

	public add(addForm: FormGroup): void {
		if (addForm.invalid) return;
		this.client = addForm.value;
		this.client.assujetti = this.selectedAssujetti;

		this.clientService.addClient(this.client).subscribe(
			(response: Client) => {
				this.dialogRef.close(response);
			},
			(error) => {
				console.log('error : ' + error.message);
			}
		);
	}

	public getAssujettis(): void {
		this.paramService.getAssujettis().subscribe(
			(response: Assujetti[]) => {
				this.assujettis = response;
			},
			(error: HttpErrorResponse) => {
				console.log(error.message);
			}
		);
	}

	public getTVAs(): void {
		this.paramService.getTVAs().subscribe(
			(response: TVA[]) => {
				this.tvas = response;
			},
			(error: HttpErrorResponse) => {
				console.log(error.message);
			}
		);
	}

	ngOnInit(): void {
		this.getAssujettis();
		this.getTVAs();
	}

	openAddAssujetti() {
		const dialogRef = this.dialog.open(AddParamComponent, {
			data: { message: 'assujetti' },
		});
		dialogRef.afterClosed().subscribe((result: string) => {
			let type = result.split('_')[0];
			let coef = result.split('_')[1];
			// @ts-ignore
			let assujetti: Assujetti = {id: null,type: type,coefficient_tva: coef,};
			this.paramService.addAssujetti(assujetti).subscribe(
				(result) => {
					this.getAssujettis();
				},
				(error: HttpErrorResponse) => {
					// alert(error.message);
				}
			);
		});
	}

	openAddTVA() {
		const dialogRef = this.dialog.open(AddParamComponent, {
			data: { message: 'tva' },
		});
		dialogRef.afterClosed().subscribe((result: string) => {
			result = result.replaceAll('_', ' ');
			result = result.trim();
			// @ts-ignore
			let tva: TVA = { id: null, base: result };
			this.paramService.addTVA(tva).subscribe(
				(result) => {
					this.getTVAs();
				},
				(error: HttpErrorResponse) => {
					// alert(error.message);
				}
			);
		});
	}
}
