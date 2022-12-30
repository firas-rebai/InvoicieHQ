import {Injectable} from '@angular/core';
import {GlobalConfig} from "../global-config";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Document} from "../_models/Document";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  apiUrl = GlobalConfig.apiUrl;

  constructor(private http: HttpClient) {
  }

  public getDocuments(type: string | null, trans: string | null): Observable<Document[]> {
    return this.http.get<Document[]>(this.apiUrl + "/document?type=" + type + "&trans=" + trans);
  }

  public addDocument(document: Document): Observable<Document> {
    return this.http.post<Document>(this.apiUrl + "/document/add", document);
  }

  public deleteDocument(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + "/document/delete/" + id);
  }

  public getDocumentId(id: number): Observable<Document> {
    return this.http.get<Document>(this.apiUrl + "/document/" + id)
  }
}
