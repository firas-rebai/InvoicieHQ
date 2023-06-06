import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Assujetti } from '../_models/Assujetti';
import { TVA } from '../_models/TVA';
import { FormGroup } from '@angular/forms';
import { ParamService } from '../_services/param.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ParameterService } from '../_services/parameter.service';
import { Settings } from '../_models/Settings';
import { MatDialog } from '@angular/material/dialog';
import { AddParamComponent } from '../add-param/add-param.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { Observable } from 'rxjs/internal/Observable';

@Component({
	selector: 'app-parameter-dialog',
	templateUrl: './parameter-dialog.component.html',
	styleUrls: ['./parameter-dialog.component.css'],
})
export class ParameterDialogComponent implements OnInit, AfterViewInit {
	param: any;
	selectedAssujetti: Assujetti;
	selectedTVA: TVA;
	assujettis: Assujetti[];
	tvas: TVA[];
	logo: any
	private profilePic: File;
	ImageUrl: string | ArrayBuffer | undefined | null;

	constructor(
		private settingsService: ParameterService,
		private paramService: ParamService,
		private dialog: MatDialog,
		private store: AngularFirestore,
		private storage: AngularFireStorage
	) {}

	public update(): void {
			this.settingsService.updateSettings(this.param)
	}

	public getAssujettis(): void {

		this.paramService.getAssujettis().subscribe(
			(response) => {
				this.assujettis = response.map((e:any) => {
					const data = e.payload.doc.data();
					data.id = e.payload.doc.id;
					return data;
				})
			},
			(error) => {
				console.log(error.message);
			}
		);
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
		const ref = this.storage.ref('logo');
     	this.logo = ref.getDownloadURL();
		this.settingsService.getSettings().snapshotChanges().subscribe(
				(response) => {
					this.param = response.payload.data();

				}
		)

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
			this.paramService.addAssujetti(assujetti);
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
			this.paramService.addTVA(tva);
		});
	}

	ngAfterViewInit(): void {
		this.getAssujettis();
		this.getTVAs();
	}

	async onSelectFile(event) {

		const file = event.target.files[0];
    	const task = await this.storage.upload('logo', file);
		const url  = await task.ref.getDownloadURL();
		console.log(url);

		this.logo = url;
	}
}
