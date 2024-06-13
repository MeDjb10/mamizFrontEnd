import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/serverSide/classes/article';
import { ArticleService } from 'src/app/serverSide/services/article.service';

@Component({
  selector: 'app-all-depots',
  templateUrl: './all-depots.component.html',
  styleUrls: ['./all-depots.component.css']
})
export class AllDepotsComponent {
  articles: Article[] = [];
  latestArticle: Article[] = [];

  constructor(
    private articleService: ArticleService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.articleService.getAll().subscribe((data) => {
      this.articles = data;
      this.latestArticle = this.getLatestArticle();
    });
  }
  getLatestArticle(): Article[] {
    return this.articles.sort((a, b) => b.date.localeCompare(a.date));
  }

}
