import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AuthServiceService } from 'src/app/serverSide/auth/auth-service.service';
import { PostService } from 'src/app/serverSide/services/post.service';

@Component({
  selector: 'app-your-posts',
  templateUrl: './your-posts.component.html',
  styleUrls: ['./your-posts.component.css'],
})
export class YourPostsComponent implements OnChanges {
  @Input() category!: string;
  filtredPosts: any[] = [];
  posts: any[] = [];

  constructor(
    private postService: PostService,
    private auth: AuthServiceService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['category']) {
      this.loadPosts();
    }
  }

  ngOnInit(): void {
    this.loadPosts();
  }

  private loadPosts(): void {
    const userId = this.auth.getCurrentUserId();
    if (userId) {
      this.postService.getPostsByUser(Number(userId)).subscribe((posts) => {
        this.posts = posts;
        this.filterPosts();
      });
    }
  }

  private filterPosts(): void {
    this.filtredPosts = this.posts.filter(data => data.status === this.category);
  }

  deletePost(id: number): void {
    this.postService.delete(id).subscribe(() => {
      this.posts = this.posts.filter((post) => post.id !== id);
    });
  }
}
