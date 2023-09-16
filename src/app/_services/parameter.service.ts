import { Injectable } from '@angular/core';
import { GlobalConfig } from '../global-config';
import { Settings } from '../_models/Settings';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
	providedIn: 'root',
})
export class ParameterService {
	apiUrl: string = GlobalConfig.apiUrl;

	constructor(private store: AngularFirestore) {}

	public getSettings(){
		let settings = this.store.collection("settings").doc("1");
		if (settings == null || settings == undefined) {
			this.set().then((response) => {
				return this.store.collection("settings").doc("1");
			})
		} else {
			return this.store.collection("settings").doc("1");
		}
		return this.store.collection("settings").doc("1");
	}

	public updateSettings(settings: Settings){

		this.store.doc("/settings/1").update(settings)
	}



	private set(){
		let set = {
			id: '1',

			raison_social: 'DEMO',

			email: 'demo@gmail.com',

			fax: '0000000',

			telephone: '0000000',

			mobile: '0000000',

			adresse: 'adresse',

			registre_commerce: '',

			fodec: 1,

			retenue_source: 1,

			timbre: 1,

			fb_acc: 'facebook',

			RIB : '123456789',

			last_document_id: '00000'
		} as Settings;
		return this.store.collection("settings").add(set)
	}

}
