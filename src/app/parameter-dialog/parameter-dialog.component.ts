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

@Component({
	selector: 'app-parameter-dialog',
	templateUrl: './parameter-dialog.component.html',
	styleUrls: ['./parameter-dialog.component.css'],
})
export class ParameterDialogComponent implements OnInit, AfterViewInit {
	param: Settings;
	selectedAssujetti: Assujetti;
	selectedTVA: TVA;
	assujettis: Assujetti[];
	tvas: TVA[];
	logo: any;
	private profilePic: File;
	ImageUrl: string | ArrayBuffer | undefined | null;

	constructor(
		private settingsService: ParameterService,
		private paramService: ParamService,
		private dialog: MatDialog
	) {}

	public update(): void {
		this.param.logo = this.logo;

		if (this.profilePic != undefined) {
			this.param.logoType = this.profilePic.type;

			this.settingsService.updateSettings(this.param).subscribe(
				(result) => {
					const formData = new FormData();
					formData.append('file', this.profilePic);
					this.settingsService
						.updateLogo(formData)
						.subscribe((result) => {
						});
				},
				(error) => {
					console.log(error);
				}
			);
		} else {
			this.settingsService.updateSettings(this.param).subscribe(
				(result) => {

				},
				(error) => {
					console.log(error);
				}
			);
		}
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
		this.settingsService.getSettings().subscribe(
			(settings: Settings) => {
				this.param = settings;
				console.log(settings);
				this.ImageUrl =
					'data:' + settings.logoType + ';base64,' + settings.logo;
			},
			(error: HttpErrorResponse) => {
				console.log(error);
			}
		);
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

	ngAfterViewInit(): void {
		this.getAssujettis();
		this.getTVAs();
	}

	onSelectFile(event) {
		this.profilePic = <File>event.target.files[0];
		this.ImageUrl = event.target.result;
		let reader = new FileReader();
		reader.onload = (e) => {
			this.ImageUrl = e.target?.result;
		};
		reader.readAsDataURL(event.target.files[0]);
	}
}
