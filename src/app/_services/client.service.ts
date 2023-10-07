import { Injectable } from '@angular/core';
import { GlobalConfig } from '../global-config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../_models/Client';
import PouchDB from 'pouchdb'
@Injectable({
	providedIn: 'root',
})
export class ClientService {
	apiUrl = GlobalConfig.apiUrl;
	db: any;

	constructor(private http: HttpClient) {
		this.db = new PouchDB("clients")
	}

	public getClients() {
		return this.db.allDocs({include_docs : true})
	}

	public addClient(client: Client) {
		client._id = (Date.now() / 1000).toString();
		return this.db.put(client);
	}

	public deleteClient(id: string) {
		return this.db.get(id).then(doc => {
			return this.db.remove(doc._id,doc._rev)
		})
	}

	public getClientId(id: string) {
		return this.db.get(id)
	}
}
