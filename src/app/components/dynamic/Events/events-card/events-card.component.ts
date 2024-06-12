import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-events-card',
  templateUrl: './events-card.component.html',
  styleUrls: ['./events-card.component.css'],
})
export class EventsCardComponent {
  @Input() title?: string;
  @Input() desc?: string;
  @Input() date?: string;
}
