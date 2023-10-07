import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Assujetti } from '../_models/Assujetti';
import { TVA } from '../_models/TVA';
import { ParamService } from '../_services/param.service';
import { ParameterService } from '../_services/parameter.service';
import { MatDialog } from '@angular/material/dialog';
import { AddParamComponent } from '../add-param/add-param.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'app-parameter-dialog',
	templateUrl: './parameter-dialog.component.html',
	styleUrls: ['./parameter-dialog.component.css'],
})
export class ParameterDialogComponent implements OnInit, AfterViewInit, OnDestroy {
	param: any;
	selectedAssujetti: Assujetti;
	selectedTVA: TVA;
	assujettis: Assujetti[];
	tvas: TVA[];
	url: any;

	constructor(private settingsService: ParameterService, private paramService: ParamService, private dialog: MatDialog, private sanitizer: DomSanitizer) {}
	ngOnDestroy(): void {
		this.update()

	}

	public update(): void {
		this.settingsService.updateSettings(this.param);
	}

	public getAssujettis(): void {
		this.paramService.getAssujettis().then(
			(response) => {
				this.assujettis = response.rows.map((e: any) => {
					const data = e.doc;
					data._id = e.doc._id;
					return data;
				});
			},
			(error) => {
				console.log(error.message);
			}
		);
	}

	public getTVAs(): void {
		this.paramService.getTVAs().then((response) => {
			const data = response.rows.map((e: any) => {
				const data = e.doc;
				data._id = e.doc._id;
				return data;
			});
			this.tvas = data;
		});
	}

	ngOnInit(): void {
		this.settingsService.get_logo().then((response) => {
			this.url = URL.createObjectURL(response);
			this.url = this.sanitizer.bypassSecurityTrustUrl(this.url);
		});

		this.settingsService.getSettings().then((response) => {
			this.param = response;
		});
	}

	openAddAssujetti() {
		const dialogRef = this.dialog.open(AddParamComponent, {
			data: { message: 'assujetti' },
		});
		dialogRef.afterClosed().subscribe((result: string) => {
			let type = result.split('_')[0];
			let coef = result.split('_')[1];
			// @ts-ignore
			let assujetti: Assujetti = { id: null, type: type, coefficient_tva: coef };
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

		this.settingsService.upload_logo(file).then((response) => {
			this.url = URL.createObjectURL(response);
			this.url = this.sanitizer.bypassSecurityTrustUrl(this.url);
		});
	}
}
