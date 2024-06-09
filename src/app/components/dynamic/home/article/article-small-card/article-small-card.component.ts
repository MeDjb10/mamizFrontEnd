import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-article-small-card',
  templateUrl: './article-small-card.component.html',
  styleUrls: ['./article-small-card.component.css'],
})
export class ArticleSmallCardComponent {
  @Input() theme?: string;
  @Input() title?: string;
}
