import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forum-aricle-card',
  templateUrl: './forum-aricle-card.component.html',
  styleUrls: ['./forum-aricle-card.component.css'],
})
export class ForumAricleCardComponent implements OnInit {
  @Input() desc?: string;
  @Input() title?: string ;
  @Input() theme?: string;
  @Input() id?: number;
  articleId:number | undefined;
  constructor(private router:Router){}
  ngOnInit(): void {
    this.articleId=this.id
  }

  isArabic(text: string | undefined): boolean {
    const arabicRegex = /[\u0600-\u06FF]/;
    return arabicRegex.test(text ?? '');
  }
  toDetails(id:number){
    
    this.router.navigate(['home/article-details',id]  );
  }
}
