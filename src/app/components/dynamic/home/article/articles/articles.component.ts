import { Component } from '@angular/core';
import { Article } from 'src/app/serverSide/classes/article';
import { ArticleService } from 'src/app/serverSide/services/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
})
export class ArticlesComponent {
  articles: Article[] = [];
  latestArticle?: Article;
  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articleService.getAll().subscribe((data) => {
      this.articles = data;
      this.latestArticle = this.getLatestArticle();
      console.log(this.articles); // Move this line inside the callback
    });
  }
  getLatestArticle(): Article {
    return this.articles.sort((a, b) => b.date.localeCompare(a.date))[0];
  }
}

