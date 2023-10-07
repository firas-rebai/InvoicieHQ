import PouchDB from 'pouchdb';
import { Injectable } from '@angular/core';
import { Fournisseur } from '../_models/Fournisseur';

@Injectable({
	providedIn: 'root',
})
export class FournisseurService {
	db: any;
	constructor() {
		this.db = new PouchDB('fournisseurs');
	}

	public getFournisseurs() {
		return this.db.allDocs({ include_docs : true })
	}

	public addFournisseur(fournisseur: Fournisseur) {
		fournisseur._id = Math.floor((Date.now() / 1000)).toString()
		return this.db.put(fournisseur)
	}

	public deleteFournisseur(id: string) {
		return this.db.get(id).then( doc => {
			return this.db.remove(doc._id,doc._rev);
		})
	}

	public getFournisseurId(id: string) {
		return this.db.get(id)
	}
}
