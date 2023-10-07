import { Injectable } from '@angular/core';
import { Document } from '../_models/Document';
import PouchDB from 'pouchdb';

@Injectable({
	providedIn: 'root',
})
export class DocumentService {
	achat: any;
	vente: any;

	constructor() {
		this.achat = new PouchDB('documents_achat');
		this.vente = new PouchDB('documents_vente');
	}

	public getDocumentsTrans(trans: string | null) {
		if (trans == 'achat') {
			return this.achat.allDocs({ include_docs: true });
		} else {
			return this.vente.allDocs({ include_docs: true });
		}
	}

	public getDocumentsType(t: string | null, trans: string | null) {
		if (trans == 'achat') {
			return this.achat.find({
				selector: {
					type: t,
				},
			});
		} else {
			return this.vente.find({
				selector: {
					type: t,
				},
			});
		}
	}

	public addDocument(document: Document) {
		document._id = Math.floor(Date.now() / 1000).toString();
		if (document.transaction == 'achat') {
			return this.achat.put(document);
		} else {
			return this.vente.put(document);
		}
	}

	public updateDocument(document: Document) {
		if (document.transaction == 'achat') {
			return this.achat.get(document._id).then((doc) => {
				return this.achat.put(doc);
			});
		} else {
			return this.vente.get(document._id).then((doc) => {
				return this.vente.put(doc);
			});
		}
	}

	public deleteDocument(id: string, transaction: string) {
		if (transaction == 'achat') {
			return this.achat.get(id).then((doc) => {
				return this.achat.remove(doc._id, doc._rev);
			});
		} else {
			return this.vente.get(id).then((doc) => {
				return this.vente.remove(doc._id, doc._rev);
			});
		}
	}

	public getDocumentId(id: string, trans: string) {
		console.log(id);

		if (trans == 'achat') {
			return this.achat.get(id);
		} else {
			return this.vente.get(id);
		}
	}
}
