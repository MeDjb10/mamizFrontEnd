import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-atelier-card',
  templateUrl: './atelier-card.component.html',
  styleUrls: ['./atelier-card.component.css'],
})
export class AtelierCardComponent {
  @Input() date?: Date;
  @Input() price?: number;
  @Input() title?: string;
}
