import { Component } from '@angular/core';

@Component({
  selector: 'app-article-tabs',
  templateUrl: './article-tabs.component.html',
  styleUrls: ['./article-tabs.component.css']
})
export class ArticleTabsComponent {
  selectedCategory = 'Tous les articles';

  categories = [
    { name: 'Tous les articles', value: '', color: '#007F73' },
    { name: 'Maman', value: 'Maman' , color: '#FF9EAA', iconClass: 'fa-solid fa-person-breastfeeding'},
    { name: 'Bébé', value: 'Bébé' , color: '#3AA6B9', iconClass: 'fa-solid fa-baby'},
    { name: 'Enfant', value: 'Enfant', color: '#80C4E9', iconClass: 'fa-solid fa-child-reaching' },
    { name: 'Grossesse', value: 'Grossesse', color: '#ff687b', iconClass: 'fa-solid fa-person-pregnant'  },
    { name: 'Préconception', value: 'Préconception', color: '#FF0000', iconClass: 'fa-solid fa-heart-pulse' }
  ];

  selectCategory(category: string) {
    this.selectedCategory = category;
  }


  currentPage = 1;
  articlesPerPage = 4;

}