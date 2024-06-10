import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-article-big-card',
  templateUrl: './article-big-card.component.html',
  styleUrls: ['./article-big-card.component.css'],
})
export class ArticleBigCardComponent {
  @Input() theme?: string;
  @Input() title?: string;
  @Input() pic?: string;
}
