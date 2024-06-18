import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css'],
})
export class EventCardComponent {
  @Input() id?: any;
  @Input() title?: string;
  @Input() desc?: string;
  @Input() date?: string;

  constructor(private router: Router) {}
  navigateToDetails(id: any): void {
    this.router.navigate(['home/event-details', id]);
  }
}
