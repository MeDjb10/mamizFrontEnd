import { Component } from '@angular/core';
import { AuthServiceService } from 'src/app/serverSide/auth/auth-service.service';
import { PostService } from 'src/app/serverSide/services/post.service';

@Component({
  selector: 'app-your-posts',
  templateUrl: './your-posts.component.html',
  styleUrls: ['./your-posts.component.css'],
})
export class YourPostsComponent {
  posts: any[] = [];

  constructor(
    private postService: PostService,
    private auth: AuthServiceService,
  ) {}

  ngOnInit(): void {
    const userId = this.auth.getCurrentUserId();
    if (userId) {
      this.postService.getPostsByUser(Number(userId)).subscribe((posts) => {
        this.posts = posts;
      });
    }
  }

  deletePost(id: number): void {
    this.postService.delete(id).subscribe(() => {
      this.posts = this.posts.filter((post) => post.id !== id);
    });
  }
}
