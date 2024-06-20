import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';

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

  currentPage: number = 1;
  articlesPerPage: number = 4;
  searchKeyword: string = '';

  private mockArticles = [
    { category: 'Maman', title: 'Les Secrets de la Maternité Heureuse' },
    { category: 'Maman', title: 'Conseils pour Équilibrer Travail et Maternité' },
    { category: 'Maman', title: 'Comment Gérer le Stress de la Vie de Maman' },
    { category: 'Bébé', title: 'Les Meilleurs Soins pour la Peau de Bébé' },
    { category: 'Bébé', title: 'Guide de l\'Alimentation pour les Nourrissons' },
    { category: 'Bébé', title: 'Les Premières Étapes de la Croissance de Bébé' },
    { category: 'Enfant', title: 'Activités Éducatives pour Enfants de 3 à 6 Ans' },
    { category: 'Enfant', title: 'Comment Encourager la Créativité chez les Enfants' },
    { category: 'Enfant', title: 'Les Bienfaits de la Lecture pour les Enfants' },
    { category: 'Grossesse', title: 'Les Signes Précoces de la Grossesse à Ne Pas Ignorer' },
    { category: 'Grossesse', title: 'Alimentation et Nutrition Pendant la Grossesse' },
    { category: 'Grossesse', title: 'Exercices Sûrs pour les Femmes Enceintes' },
    { category: 'Préconception', title: 'Préparer son Corps pour la Grossesse' },
    { category: 'Préconception', title: 'Les Tests Médicaux Avant de Concevoir' },
    { category: 'Préconception', title: 'L\'Importance de la Santé Mentale Avant la Grossesse' },
  ];

  ngOnInit(): void {
    this.loadArticles(this.category);
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
      this.articles = this.mockArticles.filter(article => article.category === category);
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
}
