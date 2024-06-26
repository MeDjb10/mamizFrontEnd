import { Component } from '@angular/core';
import { Post } from 'src/app/serverSide/classes/post';
import { AdminService } from 'src/app/serverSide/services/admin.service';
import { PostService } from 'src/app/serverSide/services/post.service';

@Component({
  selector: 'app-admin-list-posts',
  templateUrl: './admin-list-posts.component.html',
  styleUrls: ['./admin-list-posts.component.css'],
})
export class AdminListPostsComponent {
  Posts: any[] = [];
  filteredPosts: any[] = [];
  statuses: { name: string; value: string }[] = [];
  visible: boolean = false;
  post: any = null;

  constructor(private ForumService: PostService,
    private adminService: AdminService
  ) {
    this.statuses = [
      { name: 'approved', value: 'approved' },
      { name: 'pending', value: 'pending' },
      { name: 'rejected', value: 'rejected' },
    ];
  }

  ngOnInit(): void {
    this.loadPosts();
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'approved':
        return 'bg-green-500 text-white font-bold w-fit px-2 rounded';
      case 'pending':
        return 'bg-yellow-400 text-white font-bold w-fit px-2 rounded ';
      case 'rejected':
        return 'bg-red-500 text-white font-bold w-fit px-2 rounded';
      default:
        return 'bg-gray-500 text-white font-bold w-fit px-2 rounded';
    }
  }

  loadPosts() {
    this.ForumService.getAll().subscribe((data) => {
      this.Posts = data;
      this.filteredPosts = data;
    });
  }

  onSearchChange(event: Event) {
    const input = (event.target as HTMLInputElement).value.toLowerCase();
    if (input === '') {
      this.filteredPosts = this.Posts;
    } else {
      this.filteredPosts = this.Posts.filter(
        (data) =>
          (data.nom ? data.nom.toLowerCase().includes(input) : false) ||
          (data.prenom ? data.prenom.toLowerCase().includes(input) : false) ||
          (data.email ? data.email.toLowerCase().includes(input) : false),
      );
    }
  }
  showDialog(post: any) {
    this.post = post;
    this.visible = !this.visible;
  }

  approvePost(post: Post) {
    this.adminService.approvePost(post.id).subscribe(data => {
      post.status = data.status;
      this.visible = !this.visible;
    })
  }

  rejectPost(post: Post) {
    this.adminService.rejectPost(post.id).subscribe(
      data => {
        post.status = data.status;
        this.visible = !this.visible;
      }
    )
  }
}
