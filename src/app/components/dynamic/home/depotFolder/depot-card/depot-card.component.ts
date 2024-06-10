import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-depot-card',
  templateUrl: './depot-card.component.html',
  styleUrls: ['./depot-card.component.css']
})
export class DepotCardComponent {
  @Input() name?: string;
  @Input() desc?: string;
  @Input() price?: number;
  @Input() pic?: string;

}
