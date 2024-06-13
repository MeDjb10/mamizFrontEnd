import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Response } from 'src/app/serverSide/classes/response';

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

  
  reponse:FormGroup;

  constructor(private router: Router,private fb:FormBuilder) {
      this.reponse = this.fb.group({
        reponse: [''],
      });
  }

  ngOnInit(): void {
    console.log('response', this.response);
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
