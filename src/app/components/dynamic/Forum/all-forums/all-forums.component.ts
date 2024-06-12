import { Component } from '@angular/core';
import { Article } from 'src/app/serverSide/classes/article';
import { Post } from 'src/app/serverSide/classes/post';
import { ArticleService } from 'src/app/serverSide/services/article.service';
import { PostService } from 'src/app/serverSide/services/post.service';
import { Response } from 'src/app/serverSide/classes/response';
import { Router } from '@angular/router';
@Component({
  selector: 'app-all-forums',
  templateUrl: './all-forums.component.html',
  styleUrls: ['./all-forums.component.css'],
})
export class AllForumsComponent {
  articles: Article[] = [];
  latestArticle: Article[] = [];
  posts: Post[] = [];

  constructor(
    private articleService: ArticleService,
    private postService: PostService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.articleService.getAll().subscribe((data) => {
      this.articles = data;
      this.latestArticle = this.getLatestArticle();
    });
    this.postService.posts$.subscribe((posts) => {
      this.posts = posts.sort(
        (a, b) =>
          new Date(b.postDate).getTime() - new Date(a.postDate).getTime(),
      );
    });
  }
  getLatestArticle(): Article[] {
    return this.articles.sort((a, b) => b.date.localeCompare(a.date));
  }

 
}
