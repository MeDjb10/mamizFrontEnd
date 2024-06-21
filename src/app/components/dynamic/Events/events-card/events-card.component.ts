import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events-card',
  templateUrl: './events-card.component.html',
  styleUrls: ['./events-card.component.css'],
})
export class EventsCardComponent {
  @Input() id?: string;
  @Input() title?: string;
  @Input() desc?: string;
  @Input() date?: string;
  @Input() price?: number;


  constructor(private router:Router){}
  navigateToDetails(id: any): void {
    this.router.navigate(['home/atelier-details', id]);
  }
}
