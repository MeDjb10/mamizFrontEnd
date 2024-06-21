import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-new-events-card',
  templateUrl: './new-events-card.component.html',
  styleUrls: ['./new-events-card.component.css']
})
export class NewEventsCardComponent {
  @Input() date?: Date;
  @Input() price?: number;
  @Input() title?: string;
  
  @Input() description?: string;
}
