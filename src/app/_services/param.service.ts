import { Injectable } from '@angular/core';
import {GlobalConfig} from "../global-config";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Client} from "../_models/Client";
import {Unite} from "../_models/Unite";
import {TVA} from "../_models/TVA";
import {Assujetti} from "../_models/Assujetti";
import {FamilleArticle} from "../_models/FamilleArticle";
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ParamService {
  apiUrl = GlobalConfig.apiUrl;

  constructor(private http: HttpClient, private afs: AngularFirestore) {
  }



  public getAssujettis(){
    return this.afs.collection('assujetti').snapshotChanges();
  }

  public addAssujetti(assujetti: Assujetti){
	assujetti.id = this.afs.createId()
    return this.afs.collection("/assujetti").add(assujetti)
  }

  public deleteAssujetti(id: string){
    return this.afs.doc('/assujetti/' + id).delete()
  }




  public getTVAs(){
    return this.afs.collection('tva').snapshotChanges();
  }

  public addTVA(tva: TVA) {
    tva.id = this.afs.createId()
    return this.afs.collection("/tva").add(tva)
  }

  public deleteTVA(id: number) {
    return this.afs.doc('/tva/' + id).delete()
  }




  public getUnites(){
    return this.afs.collection('unite').snapshotChanges();
  }

  public addUnite(unite: Unite){
    unite.id = this.afs.createId()
    return this.afs.collection("/unite").add(unite)
  }

  public deleteUnite(id: number) {
    return this.afs.doc('/unite/' + id).delete()
  }



  public getFamilles() {
    return this.afs.collection("famille").snapshotChanges();
  }

  public addFamille(famille: FamilleArticle){
    famille.id = this.afs.createId()
    return this.afs.collection("/famille").add(famille)
  }

  public deleteFamille(id: number) {
	return this.afs.doc('/famille/' + id).delete()
  }


}
