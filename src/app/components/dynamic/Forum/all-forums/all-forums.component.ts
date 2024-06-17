import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/serverSide/classes/article';
import { Post } from 'src/app/serverSide/classes/post';
import { Response } from 'src/app/serverSide/classes/response'; // Import the Response type
import { ArticleService } from 'src/app/serverSide/services/article.service';
import { PostService } from 'src/app/serverSide/services/post.service';
import { ResponseService } from 'src/app/serverSide/services/response.service';

@Component({
  selector: 'app-all-forums',
  templateUrl: './all-forums.component.html',
  styleUrls: ['./all-forums.component.css'],
})
export class AllForumsComponent implements OnInit {
  articles: Article[] = [];
  latestArticle: Article[] = [];
  posts: Post[] = [];
  selectedSpec: string | null = null;
  search: string = '';
  filtredPosts: Post[] = [];

  constructor(
    private articleService: ArticleService,
    private postService: PostService,
    private responseService: ResponseService,
  ) { }

  ngOnInit(): void {
    this.articleService.getAll().subscribe((data) => {
      this.articles = data;
      this.latestArticle = this.getLatestArticle();
    });
    this.postService.fetchPosts().subscribe((posts) => {
      this.posts = posts.sort(
        (a, b) =>
          new Date(b.postDate).getTime() - new Date(a.postDate).getTime(),
      );
      this.filtredPosts = posts.sort(
        (a, b) =>
          new Date(b.postDate).getTime() - new Date(a.postDate).getTime(),
      );
    });
    this.responseService.responses$.subscribe((responses: Response[]) => { // Specify the type of 'responses' as Response[]
      this.updatePostsWithResponses(responses);
    });
    this.filtredPosts = this.posts;
    this.postService.fetchPosts();
    this.responseService.fetchResponses();
  }

  getLatestArticle(): Article[] {
    return this.articles.sort((a, b) => b.date.localeCompare(a.date));
  }

  private updatePostsWithResponses(responses: Response[]): void {
    this.posts.forEach((post) => {
      const response = responses.find((res) => res.post?.id === post.id);
      if (response) {
        post.response = response;
        post.responded = true;
      }
    });
  }


  onSpecialtySelected(specialty: string) {
    this.selectedSpec = specialty;
    this.applyFilters();
  }

  onSearchChanged(searchTerm: string) {
    this.search = searchTerm;
    this.applyFilters();
  }

  applyFilters() {
    if (!this.search && !this.selectedSpec || this.selectedSpec==='Afficher tous') {
      this.filtredPosts = this.posts;
    } else {
      this.filtredPosts = this.posts.filter(data => {
        const matchesSpecialty = !this.selectedSpec || data.theme.includes(this.selectedSpec);
        const matchesSearchTerm = !this.search ||
          data.title.toLowerCase().includes(this.search) ||
          data.question.toLowerCase().includes(this.search);
        return matchesSpecialty && matchesSearchTerm;
      });
    }
  }
}
