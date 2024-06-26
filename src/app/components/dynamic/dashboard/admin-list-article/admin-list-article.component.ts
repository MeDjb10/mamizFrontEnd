import { Component } from '@angular/core';
import { Article } from 'src/app/serverSide/classes/article';
import { ArticleService } from 'src/app/serverSide/services/article.service';
import { ChapterService } from 'src/app/serverSide/services/chapter.service';

@Component({
  selector: 'app-admin-list-article',
  templateUrl: './admin-list-article.component.html',
  styleUrls: ['./admin-list-article.component.css']
})
export class AdminListArticleComponent {
  articleToDelete: any;
  articleDetail: Article | null = null;
  articles: any[] = [];
  filteredArticles: any[] = [];
  Themes: any[] = [];
  dropdownVisible: boolean = false;
  selectedTheme: string = 'Afficher tous';
  searchTerm: string = '';
  statuses: any[];
  visible1: boolean = false;
  visible2: boolean = false;
  chapters: any = []
  constructor(private articleService: ArticleService, private chapterService: ChapterService) {
    this.statuses = [
      { name: 'maman', value: 'maman' },
      { name: 'bébé', value: 'bébé' },
      { name: 'enfant', value: 'enfant' },
      { name: 'grossesse', value: 'grossesse' },
      { name: 'préconception', value: 'préconception' },
    ];
  }

  categories = [
    { name: 'Maman', value: 'maman', color: '#FF9EAA', iconClass: 'fa-solid fa-person-breastfeeding' },
    { name: 'Bébé', value: 'bébé', color: '#5BBCFF', iconClass: 'fa-solid fa-baby' },
    { name: 'Enfant', value: 'enfant', color: '#91DDCF', iconClass: 'fa-solid fa-child-reaching' },
    { name: 'Grossesse', value: 'grossesse', color: '#667BC6', iconClass: 'fa-solid fa-person-pregnant' },
    { name: 'Préconception', value: 'préconception', color: '#FF0000', iconClass: 'fa-solid fa-heart-pulse' }
  ];

  ngOnInit(): void {
    this.articleService.getAll().subscribe((data) => {
      this.articles = data;
      this.filteredArticles = this.articles; // Initially show all articles
    });
  }


  onSearchChange(event: any) {
    this.searchTerm = event.target.value.toLowerCase();
    this.filterArticles();
  }

  filterArticles() {
    this.filteredArticles = this.articles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(this.searchTerm);
      return matchesSearch;
    });
  }
  getThemeColor(theme: string): string {
    const category = this.categories.find(cat => cat.value === theme);
    return category ? category.color : '#007F73'; // Default color
  }
  showDelete(article: Article) {
    this.visible1 = !this.visible1;
    this.articleToDelete = article;
  }
  deleteArticle() {
    this.articleService.getById(this.articleToDelete).subscribe(
      data => {
        if (data.chapters) {
          data.chapters.forEach((chapter: any) => {
            this.chapterService.delete(chapter.id).subscribe();
          });
        }
        
        setTimeout(() => {
          this.articleService.delete(this.articleToDelete).subscribe(() => {
            this.filteredArticles = this.filteredArticles.filter(
              (event) => event.id !== this.articleToDelete,
            );
            this.visible1 = !this.visible1;
          });}, 500); 
      }
    );
  }

  annuler() {
    this.visible1 = !this.visible1;
    this.articleToDelete = null;
  }
  showDetails(article:Article){
    this.visible2 = !this.visible2;
    this.articleDetail=article;
  }
  isArabic(text: string): boolean {
    const arabicRegex = /[\u0600-\u06FF]/;
    return arabicRegex.test(text);
  }
}
