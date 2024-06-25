import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { PaginatorState } from 'primeng/paginator';
import { ArticleService } from 'src/app/serverSide/services/article.service';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.css']
})
export class ListArticleComponent implements OnInit {
  @Input() category!: string;
  articles: any[] = [];
  displayedArticles: any[] = [];
  filteredArticles: any[] = [];
  mockArticles: any[]=[];
  currentPage: number = 1;
  articlesPerPage: number = 4;
  searchKeyword: string = '';

  categories = [
    { name: 'Tous les articles', value: '', color: '#007F73' },
    { name: 'Maman', value: 'maman', color: '#FF9EAA'},
    { name: 'Bébé', value: 'bébé', color: '#5BBCFF' },
    { name: 'Enfant', value: 'enfant', color: '#91DDCF'},
    { name: 'Grossesse', value: 'grossesse', color: '#667BC6' },
    { name: 'Préconception', value: 'préconception', color: '#FF0000' }
  ];

  constructor(
    private articleService: ArticleService,
    private router:Router,
  ){}

  ngOnInit(): void {
    this.articleService.getAll().subscribe((data) => {
      this.mockArticles = data;
      this.loadArticles(this.category);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['category']) {
      this.currentPage = 0;
      this.loadArticles(this.category);
    }
  }

  loadArticles(category: string) {
    if (category === 'Tous les articles' || category === '') {
      this.articles = this.mockArticles; // Return all articles if category is empty
    } else {
      this.articles = this.mockArticles.filter(article => article.theme === category);
    }
    this.applyFilters();
  }

  applyFilters() {
    this.filteredArticles = this.articles.filter(article =>
      article.title.toLowerCase().includes(this.searchKeyword.toLowerCase())
    );
    this.updateDisplayedArticles();
  }

  updateDisplayedArticles() {
    const startIndex = this.currentPage * this.articlesPerPage;
    const endIndex = startIndex + this.articlesPerPage;
    this.displayedArticles = this.filteredArticles.slice(startIndex, endIndex);
  }

  changePage(event: PaginatorState) {
    this.currentPage = event.page || 0;
    this.updateDisplayedArticles();
  }

  get totalPages(): number {
    return Math.ceil(this.filteredArticles.length / this.articlesPerPage);
  }

  onSearchChange(event: Event) {
    this.searchKeyword = (event.target as HTMLInputElement).value.toLowerCase();
    this.applyFilters();
  }

  isArabic(text: string): boolean {
    const arabicRegex = /[\u0600-\u06FF]/;
    return arabicRegex.test(text);
  }

  toDetails(id:number){
    this.router.navigate(['home/article-details',id]);
  }

  getThemeColor(theme: string): string {
    const category = this.categories.find(cat => cat.value === theme);
    return category ? category.color : '#007F73'; // Default color
  }
}
