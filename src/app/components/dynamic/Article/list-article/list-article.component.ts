import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.css']
})
export class ListArticleComponent {
  @Input() category!: string;
  articles: any[] = [];

  private mockArticles = [
    { category: 'Maman', title: 'Article 1' },
    { category: 'Maman', title: 'Article 2' },
    { category: 'Bébé', title: 'Article 3' },
    { category: 'Enfant', title: 'Article 4' },
    { category: 'Grossesse', title: 'Article 5' },
    { category: 'Préconception', title: 'Article 6' }
  ];

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['category']) {
      this.loadArticles(this.category);
    }
  }

  loadArticles(category: string) {
    if (category === '') {
      this.articles = this.mockArticles; // Return all articles if category is empty
    } else {
      this.articles = this.mockArticles.filter(article => article.category === category);
    }
  }
}
