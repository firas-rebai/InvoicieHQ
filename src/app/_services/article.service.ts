import { Injectable } from '@angular/core';
import {GlobalConfig} from "../global-config";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Client} from "../_models/Client";
import {Article} from "../_models/Article";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  apiUrl = GlobalConfig.apiUrl;

  constructor(private http: HttpClient) {
  }

  public getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl + "/article");
  }

  public addArticle(Article: Article): Observable<Article> {
    return this.http.post<Article>(this.apiUrl + "/article/add", Article);
  }

  public deleteArticle(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + "/article/delete/" + id);
  }

  public getArticleId(id: number): Observable<Article> {
    return this.http.get<Article>(this.apiUrl + "/article/" + id)
  }
}
