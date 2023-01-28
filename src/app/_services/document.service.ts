import {Injectable} from '@angular/core';
import {GlobalConfig} from "../global-config";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Document} from "../_models/Document";
import {ArticleDocument} from "../_models/ArticleDocument";

const httpOptions = {
	headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
	providedIn: 'root'
})
export class DocumentService {

	apiUrl = GlobalConfig.apiUrl;

	constructor(private http: HttpClient) {
	}

	public getDocumentsTrans(trans: string | null): Observable<Document[]> {
		return this.http.get<Document[]>(this.apiUrl + "/document/all?trans=" + trans);
	}

	public getDocumentsType(type: string | null, trans: string | null): Observable<Document[]> {
		return this.http.get<Document[]>(this.apiUrl + "/document?type=" + type + "&trans=" + trans);
	}

	public addDocument(document: Document): Observable<Document> {
		return this.http.post<Document>(this.apiUrl + "/document/add", document);
	}

	public updateDocument(document: Document): Observable<Document> {
		return this.http.put<Document>(this.apiUrl + "/document/update", document);
	}

	public deleteDocument(id: number): Observable<void> {
		return this.http.delete<void>(this.apiUrl + "/document/delete/" + id);
	}

	public getDocumentId(id: number): Observable<Document> {
		return this.http.get<Document>(this.apiUrl + "/document/" + id)
	}

	public saveArticles(articles: ArticleDocument[], id: number): Observable<any> {
		return this.http.post(this.apiUrl + '/document/add/article', {articles: articles, id: id}, httpOptions);
	}

	public generatePDF(id: number) : Observable<any> {
		const httpOptions = {
			responseType: 'arraybuffer' as 'json'
		};
		return this.http.get<any>(this.apiUrl + "/pdf/" + id, httpOptions);
	}
}
