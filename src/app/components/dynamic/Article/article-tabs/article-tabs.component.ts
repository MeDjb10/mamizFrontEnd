import { Component } from '@angular/core';

@Component({
  selector: 'app-article-tabs',
  templateUrl: './article-tabs.component.html',
  styleUrls: ['./article-tabs.component.css']
})
export class ArticleTabsComponent {
  selectedCategory = 'Tous les articles';

  categories = [
    { name: 'Tous les articles', value: '' },
    { name: 'Maman', value: 'Maman' , color: '#FEB2B2', iconClass: 'fa-solid fa-person-breastfeeding'},
    { name: 'Bébé', value: 'Bébé' , color: '#C6F6D5', iconClass: 'fa-solid fa-baby'},
    { name: 'Enfant', value: 'Enfant', color: '#A5B4FC', iconClass: 'fa-solid fa-child-reaching' },
    { name: 'Grossesse', value: 'Grossesse', color: '#FCD34D', iconClass: 'fa-solid fa-person-pregnant'  },
    { name: 'Préconception', value: 'Préconception', color: '#FCA5A5', iconClass: 'fa-solid fa-heart-pulse' }
  ];
  selectCategory(category: string) {
    this.selectedCategory = category;
  }
}
