import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { Fournisseur } from '../_models/Fournisseur';
import { HttpClient } from '@angular/common/http';
import { GlobalConfig } from '../global-config';
import { Settings } from '../_models/Settings';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FileUpload } from '../_models/FileUpload';

@Injectable({
	providedIn: 'root',
})
export class ParameterService {
	apiUrl: string = GlobalConfig.apiUrl;

	constructor(private store: AngularFirestore) {}

	public getSettings(){
		return this.store.collection("settings").doc("1");
	}

	public updateSettings(settings: Settings){
		this.store.doc("/settings/1").update(settings)
	}

	public updateLogo(file: FormData){
		return
	}


}
