import { Injectable } from '@angular/core';
import {GlobalConfig} from "../global-config";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Client} from "../_models/Client";
import {Article} from "../_models/Article";
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  apiUrl = GlobalConfig.apiUrl;

  constructor(private store: AngularFirestore) {
  }

  public getArticles(){
    return this.store.collection("article").snapshotChanges()
  }

  public addArticle(article: Article) {
    return this.store.collection('article').add(article)
  }

  public deleteArticle(id: number){
    return this.store.doc("/article/" + id).delete();
  }

  public getArticleId(id: number){
    return this.store.doc("/article/" + id).snapshotChanges();
  }
}
