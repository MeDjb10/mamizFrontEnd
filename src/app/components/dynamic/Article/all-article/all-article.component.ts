import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/serverSide/services/article.service';

@Component({
  selector: 'app-all-article',
  templateUrl: './all-article.component.html',
  styleUrls: ['./all-article.component.css']
})
export class AllArticleComponent implements OnInit{
  articles:any[]=[]

  categories = [
    { name: 'Tous les articles', value: '', color: '#007F73' },
    { name: 'Maman', value: 'maman', color: '#FF9EAA'},
    { name: 'Bébé', value: 'bébé', color: '#5BBCFF' },
    { name: 'Enfant', value: 'enfant', color: '#91DDCF'},
    { name: 'Grossesse', value: 'grossesse', color: '#667BC6' },
    { name: 'Préconception', value: 'préconception', color: '#FF0000' }
  ];

  constructor(
    private router: Router,
    private articleService: ArticleService,
  ) { }

  ngOnInit(): void {
    this.articleService.getAll().subscribe((data) => {
      this.articles = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
  }
  getThemeColor(theme: string): string {
    const category = this.categories.find(cat => cat.value === theme);
    return category ? category.color : '#007F73'; // Default color
  }
  isArabic(text: string): boolean {
    const arabicRegex = /[\u0600-\u06FF]/;
    return arabicRegex.test(text);
  }
  toDetails(id:number){
    this.router.navigate(['home/article-details',id]);
  }
}
