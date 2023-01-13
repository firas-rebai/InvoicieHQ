import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TVA} from "../_models/TVA";
import {Assujetti} from "../_models/Assujetti";
import {FamilleArticle} from "../_models/FamilleArticle";
import {Unite} from "../_models/Unite";


@Component({
	selector: 'app-add-param',
	templateUrl: './add-param.component.html',
	styleUrls: ['./add-param.component.css']
})
export class AddParamComponent {
	message: string;
	message2: string;
	two: boolean = false;
	param2: string = "";
	param : string = "";

	constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string },public dialogRef: MatDialogRef<AddParamComponent>) {
	}

	ngOnInit(): void {
		const data = this.data.message
		console.log(data)
		if (data == "tva") {
			this.message = "Base TVA";
		} else if (data == "unite") {
			this.message = "Unité";
		} else if (data == "famille") {
			this.message = "Famille d'article";
		} else if (data == "assujetti") {
			this.two = true;
			this.message = "Type";
			this.message2 = "Coefficient TVA";
		}
	}


	result() {
		if (this.data.message == "assujetti") {
			this.param = this.param + "_" + this.param2
			console.log("assujetti")
		}
		this.dialogRef.close();
	}
}
