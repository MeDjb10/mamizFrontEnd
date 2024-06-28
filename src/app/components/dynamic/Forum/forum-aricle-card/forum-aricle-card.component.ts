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

  
  categories = [
    { name: 'Tous les articles', value: '', color: '#007F73' },
    { name: 'Maman', value: 'maman', color: '#FF9EAA'},
    { name: 'Bébé', value: 'bébé', color: '#5BBCFF' },
    { name: 'Enfant', value: 'enfant', color: '#91DDCF'},
    { name: 'Grossesse', value: 'grossesse', color: '#667BC6' },
    { name: 'Préconception', value: 'préconception', color: '#FF0000' }
  ];

  ngOnInit(): void {
    this.articleId=this.id
  }

  isArabic(text: string | undefined): boolean {
    const arabicRegex = /[\u0600-\u06FF]/;
    return arabicRegex.test(text ?? '');
  }
  getThemeColor(theme: string): string {
    const category = this.categories.find(cat => cat.value === theme);
    return category ? category.color : '#007F73'; // Default color
  }
  toDetails(id:number){
    
    this.router.navigate(['home/article-details',id]  );
  }
}
