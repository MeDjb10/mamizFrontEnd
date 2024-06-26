import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/serverSide/auth/auth-service.service';
import { PostService } from 'src/app/serverSide/services/post.service';

@Component({
  selector: 'app-forum-details',
  templateUrl: './forum-details.component.html',
  styleUrls: ['./forum-details.component.css'],
})
export class ForumDetailsComponent {
  @Input() id: number = 0;
  post: any;
  traitement: boolean = false;
  isMedcin: boolean = false;
  constructor(
    private postService: PostService,
    private authService: AuthServiceService,
  ) {}

  ngOnInit(): void {
    this.isMedcin = this.authService.isMedcin();
    this.postService.getById(this.id).subscribe((data) => {
      this.post = data;
      this.traitement = this.post.traitement;
      console.log(this.post);
    });
  }

  //TODO:need to fix the post.response(after i made changes to the post model and changing it to postDTO , it doesnt have the reponse , so i need to find a way to get the response for that post)

  //FIXME: i need to fix the post.response to get the response for that post 

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
