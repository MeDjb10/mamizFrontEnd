import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Response } from 'src/app/serverSide/classes/response';
import { MedcinService } from 'src/app/serverSide/services/medcin.service';
import { PostService } from 'src/app/serverSide/services/post.service';
import { ResponseService } from 'src/app/serverSide/services/response.service';

@Component({
  selector: 'app-forums-card',
  templateUrl: './forums-card.component.html',
  styleUrls: ['./forums-card.component.css'],
})
export class ForumsCardComponent implements OnInit {
  @Input() id: number = 0; // Add an initializer for the 'id' property
  @Input() title?: string;
  @Input() theme?: string;
  @Input() question?: string;
  @Input() responded?: boolean;
  @Input() response?: Response;
  medcin: any;
  post: any;

  reponse: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private responseService: ResponseService,
    private postService: PostService,
    private medcinService: MedcinService,
  ) {
    this.reponse = this.fb.group({
      reponse: [''],
    });
  }

  ngOnInit(): void {
    this.medcinService.getById(1).subscribe((data) => {
      this.medcin = data;
    });
    this.postService.getById(this.id).subscribe((data) => {
      this.post = data;
    });
  }

  onSubmit() {
    if (this.reponse.valid) {
      const newResponse: any = {
        content: this.reponse.value.reponse,
      };

      console.log(newResponse);
      this.responseService
        .createResponse(this.id, this.medcin.id, newResponse)
        .subscribe(
          (response) => {
            console.log('Response created', response);
            // You can add code here to handle the response, for example to update the UI
          },
          (error) => {
            console.error('Error creating response', error);
            // You can add code here to handle the error, for example to show an error message
          },
        );

      this.reponse.reset();
    }
  }

  get medcinName(): string {
    return this.response?.medcin
      ? `${this.response.medcin.nom.toUpperCase()} ${this.response.medcin.prenom}`
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
