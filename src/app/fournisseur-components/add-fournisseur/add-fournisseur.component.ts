import { Component } from '@angular/core';
import { Client } from '../../_models/Client';
import { Assujetti } from '../../_models/Assujetti';
import { TVA } from '../../_models/TVA';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../_services/client.service';
import { ParamService } from '../../_services/param.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Fournisseur } from '../../_models/Fournisseur';
import { FournisseurService } from '../../_services/fournisseur.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddParamComponent } from 'src/app/add-param/add-param.component';

@Component({
	selector: 'app-add-fournisseur',
	templateUrl: './add-fournisseur.component.html',
	styleUrls: ['./add-fournisseur.component.css'],
})
export class AddFournisseurComponent {
	fournisseur: Fournisseur;
	selectedTVA: TVA;
	tvas: TVA[];
	ht_ttc: string;
	fodec: boolean;

	public fournisseurForm = new FormGroup({
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
		return this.fournisseurForm.controls['raison_social'];
	}

	constructor(
		private fournisseurService: FournisseurService,
		private paramService: ParamService,
		public dialogRef: MatDialogRef<AddFournisseurComponent>,
		private dialog : MatDialog
	) {}

	public add(addForm: FormGroup): void {
		if (addForm.invalid) return;
		this.fournisseur = addForm.value;
		this.fournisseur.tva = this.selectedTVA;
		this.fournisseur.fodec = this.fodec;
		this.fournisseur.ht_ttc = this.ht_ttc;
		this.fournisseurService.addFournisseur(this.fournisseur);
	}

	public getTVAs(): void {
		this.paramService.getTVAs().subscribe(
			(response) => {
				const data = response.map((e:any) => {
					const data = e.payload.doc.data();
					data.id = e.payload.doc.id;
					return data;
				})
				this.tvas = data;
			},
			(error: HttpErrorResponse) => {
				console.log(error.message);
			}
		);
	}

	ngOnInit(): void {
		this.getTVAs();
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
			this.paramService.addTVA(tva);
		});
	}
}
