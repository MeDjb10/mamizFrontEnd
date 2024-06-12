import { Component, Input, OnInit } from '@angular/core';
import { Response } from 'src/app/serverSide/classes/response';

@Component({
  selector: 'app-forums-card',
  templateUrl: './forums-card.component.html',
  styleUrls: ['./forums-card.component.css'],
})
export class ForumsCardComponent implements OnInit {
  @Input() title?: string;
  @Input() theme?: string;
  @Input() question?: string;
  @Input() responded?: boolean;
  @Input() response?: Response;

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
}
