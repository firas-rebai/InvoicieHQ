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


	getArticles() {
		this.articleService.getArticles().then(
			(response) => {
				const data = response.rows.map((e:any) => {
					const data = e.doc
					data._id = e.doc._id;
					return data;
				})
				this.articles = data;
			}, (error) => {

			}
		)
	}

	ngOnInit(): void {
		this.getArticles()
	}



	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		//this.documents.filter = filterValue.trim().toLowerCase();
		if (filterValue == '') this.getArticles()
		this.articles = this.articles.filter(
			(article) => {
				return article.designation?.trim().toLowerCase().includes(filterValue.trim().toLowerCase()) ;
			}
		)
	}




}
