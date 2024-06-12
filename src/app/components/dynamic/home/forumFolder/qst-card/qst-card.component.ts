import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-qst-card',
  templateUrl: './qst-card.component.html',
  styleUrls: ['./qst-card.component.css']
})
export class QstCardComponent {
    @Input() title?: string;
    @Input() theme?: string;
    @Input() question?: string;
    
}
