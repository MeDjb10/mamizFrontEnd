import { Component } from '@angular/core';
import { ArticleService } from 'src/app/serverSide/services/article.service';

@Component({
  selector: 'app-admin-list-article',
  templateUrl: './admin-list-article.component.html',
  styleUrls: ['./admin-list-article.component.css']
})
export class AdminListArticleComponent {
  articles: any[] = [];
  filteredArticles: any[] = [];
  Themes: any[] = [];
  dropdownVisible: boolean = false;
  selectedTheme: string = 'Afficher tous';
  searchTerm: string = '';

  constructor(private articleService: ArticleService) {
    this.Themes = [
      { name: 'Afficher tous' },
      { name: 'Grossesse' },
      { name: 'bébé' },
      { name: 'Enfant' },
      { name: 'Préconception' },
      { name: 'Maman' }
    ];
  }

  ngOnInit(): void {
    this.articleService.getAll().subscribe((data) => {
      this.articles = data;
      this.filteredArticles = this.articles; // Initially show all articles
    });
  }

  onSpecialtySelected(specialty: string) {
    this.selectedTheme = specialty;
    this.filterArticles();
    this.dropdownVisible = false;
  }

  onSearchChange(event: any) {
    this.searchTerm = event.target.value.toLowerCase();
    this.filterArticles();
  }

  filterArticles() {
    this.filteredArticles = this.articles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(this.searchTerm);
      const matchesTheme = this.selectedTheme === 'Afficher tous' || article.category === this.selectedTheme;
      return matchesSearch && matchesTheme;
    });
  }
  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }
}
