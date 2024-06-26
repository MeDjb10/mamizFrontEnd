import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Response } from 'src/app/serverSide/classes/response';
import { MedcinService } from 'src/app/serverSide/services/medcin.service';
import { PostService } from 'src/app/serverSide/services/post.service';
import { ResponseService } from 'src/app/serverSide/services/response.service';
import { AuthServiceService } from 'src/app/serverSide/auth/auth-service.service';

@Component({
  selector: 'app-forums-card',
  templateUrl: './forums-card.component.html',
  styleUrls: ['./forums-card.component.css'],
  providers: [MessageService],
})
export class ForumsCardComponent implements OnInit {
  @Input() id: number = 0;
  @Input() title?: string;
  @Input() theme?: string;
  @Input() question?: string;
  @Input() responded?: boolean;
  @Input() response?: Response;
  @Input() postDate?: string;
  medcin: any;
  post: any;
  reponse: FormGroup;
  isMedcin: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private responseService: ResponseService,
    private postService: PostService,
    private medcinService: MedcinService,
    private messageService: MessageService,
    private authService: AuthServiceService,
  ) {
    this.reponse = this.fb.group({
      reponse: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.isMedcin = this.authService.isMedcin();
    if (this.isMedcin) {
      const medcinId = this.authService.getCurrentUserId();
      if (medcinId) {
        this.medcinService.getById(Number(medcinId)).subscribe((data) => {
          this.medcin = data;
        });
      }
    }
    this.postService.getById(this.id).subscribe((data) => {
      this.post = data;
    });
  }

  onSubmit() {
    if (this.reponse.valid && this.isMedcin && this.medcin) {
      const newResponse: any = {
        content: this.reponse.value.reponse,
      };
      console.log(this.id);
      
      this.responseService
        .createResponse(this.id, this.medcin.id, newResponse)
        .subscribe({
          next: (response) => {
            console.log('Response created', response);
            this.response = response;
            this.responded = true;
          },
          error: (error) => {
            console.error('Error creating response', error);
          },
        });
      this.reponse.reset();
    }
  }

  get medcinName(): string {
    return this.response?.medcin
      ? `${this.response.medcin.nom} ${this.response.medcin.prenom}`
      : '';
  }

  get medcinSpecialite(): string {
    return this.response?.medcin ? this.response.medcin.specialite : '';
  }

  navigateToDetails(id: number): void {
    this.router.navigate(['home/forum-details', id]);
  }

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }
}
