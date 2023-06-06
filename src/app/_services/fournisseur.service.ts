import { Injectable } from '@angular/core';
import {GlobalConfig} from "../global-config";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Fournisseur} from "../_models/Fournisseur";
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  apiUrl = GlobalConfig.apiUrl;

  constructor(private store: AngularFirestore) {
  }

  public getFournisseurs() {
    return this.store.collection("fournisseur").snapshotChanges()
  }

  public addFournisseur(fournisseur: Fournisseur) {
	fournisseur.id = this.store.createId()
    return this.store.collection("fournisseur").add(fournisseur)
  }

  public deleteFournisseur(id: number) {
    return this.store.doc("fournisseur/" + id).delete()
  }

  public getFournisseurId(id: number) {
    return this.store.doc("fournisseur/" + id)
  }

}
