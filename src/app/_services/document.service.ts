import {Injectable} from '@angular/core';
import {GlobalConfig} from "../global-config";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Document} from "../_models/Document";
import {ArticleDocument} from "../_models/ArticleDocument";
import { AngularFirestore } from '@angular/fire/compat/firestore';

const httpOptions = {
	headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
	providedIn: 'root'
})
export class DocumentService {

	apiUrl = GlobalConfig.apiUrl;

	constructor(private http: HttpClient, private store: AngularFirestore) {
	}

	public getDocumentsTrans(trans: string | null) {
		return this.store.collection("document", ref => ref.where('transaction', '==', trans)).snapshotChanges()
	}

	public getDocumentsType(type: string | null, trans: string | null){
		return this.store.collection('document', ref => ref.where('transaction', '==', trans).where('type', '==', type)).snapshotChanges()
	}

	public addDocument(document: Document) {
		document.id = this.store.createId();
		return this.store.collection("document").add(document);
	}

	public updateDocument(document: Document) {
		return this.store.doc("document/" + document.id).update(document)
	}

	public updateDocumentType(id: string, type: string) {

		return this.http.put<Document>(this.apiUrl + "/document/update-type/" + id + "/" + type, document);
	}

	public deleteDocument(id: number) {
		return this.http.delete<void>(this.apiUrl + "/document/delete/" + id);
	}

	public getDocumentId(id: string) {
		return this.store.doc('/document/' + id).snapshotChanges()
	}

	public saveArticles(articles: ArticleDocument[], id: number) {
		return this.http.post(this.apiUrl + '/document/add/article', {articles: articles, id: id}, httpOptions);
	}

	public generatePDF(id: string) : Observable<any> {
		const httpOptions = {
			responseType: 'arraybuffer' as 'json'
		};
		return this.http.get<any>(this.apiUrl + "/pdf/" + id, httpOptions);
	}
}
