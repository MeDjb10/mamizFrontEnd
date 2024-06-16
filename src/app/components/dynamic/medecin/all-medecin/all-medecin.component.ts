import { Component } from '@angular/core';
import { Article } from 'src/app/serverSide/classes/article';
import { Medcin } from 'src/app/serverSide/classes/medcin';
import { Post } from 'src/app/serverSide/classes/post';
import { ArticleService } from 'src/app/serverSide/services/article.service';
import { MedcinService } from 'src/app/serverSide/services/medcin.service';
import { PostService } from 'src/app/serverSide/services/post.service';
import { ResponseService } from 'src/app/serverSide/services/response.service';

@Component({
  selector: 'app-all-medecin',
  templateUrl: './all-medecin.component.html',
  styleUrls: ['./all-medecin.component.css']
})
export class AllMedecinComponent {
  articles: Article[] = [];
  latestArticle: Article[] = [];
  doctors:Medcin[]=[];

  constructor(
    private articleService: ArticleService,
    private medcinService: MedcinService,
  ) {}

  ngOnInit(): void {
    this.articleService.getAll().subscribe((data) => {
      this.articles = data;
      this.latestArticle = this.getLatestArticle();
    });
    this.medcinService.getAll().subscribe((data) => {
      this.doctors = data;
    })
  }

  getLatestArticle(): Article[] {
    return this.articles.sort((a, b) => b.date.localeCompare(a.date));
  }

}
