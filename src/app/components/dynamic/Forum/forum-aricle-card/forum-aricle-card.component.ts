import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-forum-aricle-card',
  templateUrl: './forum-aricle-card.component.html',
  styleUrls: ['./forum-aricle-card.component.css'],
})
export class ForumAricleCardComponent {
  @Input() desc?: string;
  @Input() title?: string;
}
