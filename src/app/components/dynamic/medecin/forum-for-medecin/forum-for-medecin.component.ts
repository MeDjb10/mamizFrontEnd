import { Component } from '@angular/core';
import { Post } from 'src/app/serverSide/classes/post';
import { PostService } from 'src/app/serverSide/services/post.service';

@Component({
  selector: 'app-forum-for-medecin',
  templateUrl: './forum-for-medecin.component.html',
  styleUrls: ['./forum-for-medecin.component.css']
})
export class ForumForMedecinComponent {
  posts: Post[] = [];

  constructor(private postService:PostService) {}

  ngOnInit(): void {
    this.postService.fetchPosts().subscribe((posts) => {
      this.posts = posts;
      this.posts.sort(
        (a, b) =>
          new Date(b.postDate).getTime() - new Date(a.postDate).getTime(),
      );
    });
    
    this.postService.fetchPosts();
  }

}
