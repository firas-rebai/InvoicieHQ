import { Injectable } from '@angular/core';
import { GlobalConfig } from '../global-config';
import { Article } from '../_models/Article';
import PouchDB from 'pouchdb';

@Injectable({
	providedIn: 'root',
})
export class ArticleService {
	apiUrl = GlobalConfig.apiUrl;
	db: any;

	constructor() {
		this.db = new PouchDB('articles');
	}

	public getArticles() {
		return this.db.allDocs({ include_docs: true });
	}

	public addArticle(article: Article) {
		article._id = Math.floor(Date.now() / 1000).toString();
		return this.db.put(article);
	}

	public deleteArticle(id: string) {
		return this.db.get(id).then((doc) => {
			return this.db.remove(doc._id, doc._rev);
		});
	}

	public getArticleId(id: string) {
		return this.db.get(id);
	}
}
