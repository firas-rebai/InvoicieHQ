import  PouchDB  from 'pouchdb';
import { Injectable } from '@angular/core';
import { Unite } from '../_models/Unite';
import { TVA } from '../_models/TVA';
import { Assujetti } from '../_models/Assujetti';
import { FamilleArticle } from '../_models/FamilleArticle';

@Injectable({
	providedIn: 'root',
})
export class ParamService {
	assujettiDB : any;
	uniteDB : any;
	tvaDB : any;
	familleDB : any;
	constructor() {
		this.assujettiDB = new PouchDB("assujettis")
		this.uniteDB = new PouchDB("unites")
		this.tvaDB = new PouchDB("tvas")
		this.familleDB = new PouchDB("familles")
	}

	public getAssujettis() {
		return this.assujettiDB.allDocs({include_docs: true})
	}

	public addAssujetti(assujetti: Assujetti) {
		assujetti._id = Math.floor((Date.now() / 1000)).toString()
		return this.assujettiDB.put(assujetti)
	}

	public deleteAssujetti(id: string) {
		return this.assujettiDB.get(id).then( doc => {
			return this.assujettiDB.remove(doc._id,doc._rev);
		})
	}

	public getTVAs() {
		return this.tvaDB.allDocs({include_docs : true})
	}

	public addTVA(tva: TVA) {
		tva._id = Math.floor((Date.now() / 1000)).toString()
		return this.tvaDB.put(tva)
	}

	public deleteTVA(id: string) {
		return this.tvaDB.get(id).then( doc => {
			return this.tvaDB.remove(doc._id,doc._rev);
		})
	}

	public getUnites() {
		return this.uniteDB.allDocs({include_docs : true})
	}

	public addUnite(unite: Unite) {
		unite._id = Math.floor((Date.now() / 1000)).toString()
		return this.uniteDB.put(unite)
	}

	public deleteUnite(id: string) {
		return this.uniteDB.get(id).then( doc => {
			return this.tvaDB.remove(doc._id,doc._rev);
		})
	}

	public getFamilles() {
		return this.familleDB.allDocs({include_docs : true})
	}

	public addFamille(famille: FamilleArticle) {
		famille._id = Math.floor((Date.now() / 1000)).toString()
		return this.familleDB.put(famille)
	}

	public deleteFamille(id: string) {
		return this.familleDB.get(id).then( doc => {
			return this.familleDB.remove(doc._id,doc._rev);
		})	}
}
