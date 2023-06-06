import {Component, OnInit} from '@angular/core';
import {Article} from "../_models/Article";
import {ArticleService} from "../_services/article.service";

@Component({
	selector: 'app-list-article',
	templateUrl: './list-article.component.html',
	styleUrls: ['./list-article.component.css']
})
export class ListArticleComponent implements OnInit{
	articles : Article [];
	constructor(private articleService: ArticleService) {
	}

	ngOnInit(): void {
		this.articleService.getArticles().subscribe(
			(response) => {
				const data = response.map((e:any) => {
					const data = e.payload.doc.data();
					data.id = e.payload.doc.id;
					return data;
				})
				this.articles = data;
			}, (error) => {

			}
		)
	}


}
