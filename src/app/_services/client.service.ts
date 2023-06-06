import {Injectable} from '@angular/core';
import {GlobalConfig} from "../global-config";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Client} from "../_models/Client";
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  apiUrl = GlobalConfig.apiUrl;

  constructor(private http: HttpClient, private store: AngularFirestore	) {
  }

  public getClients(){
    return this.store.collection("client").snapshotChanges()
  }

  public addClient(client: Client) {
	client.id = this.store.createId()
    return this.store.collection("client").add(client);
  }

  public deleteClient(id: number) {
    return this.store.doc("/client/" + id).delete()
  }

  public getClientId(id: number) {
    return this.store.doc("/client/" + id)
  }

}
