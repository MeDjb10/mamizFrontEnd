import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forum-aricle-card',
  templateUrl: './forum-aricle-card.component.html',
  styleUrls: ['./forum-aricle-card.component.css'],
})
export class ForumAricleCardComponent {
  @Input() desc?: string;
  @Input() title?: string ;
  @Input() theme?: string;
  @Input() id?: number;

  constructor(private router:Router){}

  isArabic(text: string | undefined): boolean {
    const arabicRegex = /[\u0600-\u06FF]/;
    return arabicRegex.test(text ?? '');
  }
  toDetails(id:number){
    this.router.navigate(['home/article-details',id]  );
  }
}
