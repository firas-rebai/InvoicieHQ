import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Assujetti} from "../_models/Assujetti";
import {TVA} from "../_models/TVA";
import {FormGroup} from "@angular/forms";
import {ParamService} from "../_services/param.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ParameterService} from "../_services/parameter.service";
import {Settings} from "../_models/Settings";

@Component({
	selector: 'app-parameter-dialog',
	templateUrl: './parameter-dialog.component.html',
	styleUrls: ['./parameter-dialog.component.css']
})
export class ParameterDialogComponent implements OnInit, AfterViewInit {
	param: Settings;
	selectedAssujetti: Assujetti;
	selectedTVA: TVA;
	assujettis: Assujetti[];
	tvas: TVA[];




	constructor(private settingsService: ParameterService, private paramService: ParamService) {
	}


	public update(): void {
		this.settingsService.updateSettings(this.param).subscribe(
			(result) => {
				console.log(result);
			}, (error) => {
				console.log(error);
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
		this.settingsService.getSettings().subscribe(
			(settings: Settings) => {
				this.param = settings;
				// this.paramForm = new FormGroup(
				//   {
				//     raison_social: new FormControl(settings.raisonSocial, [Validators.required, Validators.pattern('^[a-zA-Z0-9\' ]{2,30}$')]),
				//     adresse: new FormControl(settings.adresse, []),
				//     telephone: new FormControl(settings.telephone, []),
				//     mobile: new FormControl(settings.mobile, []),
				//     fax: new FormControl(settings.fax, []),
				//     email: new FormControl(settings.email, []),
				//     fb_acc: new FormControl(settings.fb_acc, []),
				//     retenue_cource: new FormControl(settings.retenue_source, []),
				//     registre_commerce: new FormControl(settings.registre_commerce, []),
				//     timbre: new FormControl(settings.timbre, []),
				//     fodec: new FormControl(settings.fodec, []),
				//     tva: new FormControl(settings.tva, []),
				//     assujetti: new FormControl(settings.assujetti, []),
				//   }
				// )
			},
			(error: HttpErrorResponse) => {
				console.log(error);
			}
		)

	}

	openAddAssujetti() {

	}

	openAddTVA() {

	}

	ngAfterViewInit(): void {
		this.getAssujettis();
		this.getTVAs();
	}
}
