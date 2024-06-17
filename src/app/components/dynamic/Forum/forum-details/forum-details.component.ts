import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/serverSide/services/post.service';

@Component({
  selector: 'app-forum-details',
  templateUrl: './forum-details.component.html',
  styleUrls: ['./forum-details.component.css'],
})
export class ForumDetailsComponent {
  @Input() id: number = 0; 
  post: any; // Adjust the type as needed
  traitement:boolean=false;
  constructor(
  
    private postService: PostService,
  ) {}

  ngOnInit(): void {
    this.postService.getById(this.id).subscribe((data) => {
      this.post = data;
      this.traitement=this.post.traitement;
      
    });
  }

  get rsDate(): string {
    return this.post?.response?.responseDate
      ? `${this.post?.response?.responseDate} `
      : '';
  }

  get medcinName(): string {
    return this.post?.response?.medcin
      ? `${this.post?.response?.medcin?.nom} ${this.post?.response?.medcin?.prenom}`
      : '';
  }

  get medcinSpecialite(): string {
    return this.post?.response?.medcin
      ? this.post?.response?.medcin?.specialite
      : '';
  }

  get content(): string {
    return this.post?.response?.content;
  }


}
