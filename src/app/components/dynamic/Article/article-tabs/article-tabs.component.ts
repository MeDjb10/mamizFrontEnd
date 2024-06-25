import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-tabs',
  templateUrl: './article-tabs.component.html',
  styleUrls: ['./article-tabs.component.css']
})
export class ArticleTabsComponent {
  
  selectedCategory = 'Tous les articles';

  categories = [
    { name: 'Tous les articles', value: '', color: '#007F73' },
    { name: 'Maman', value: 'maman' , color: '#FF9EAA', iconClass: 'fa-solid fa-person-breastfeeding'},
    { name: 'Bébé', value: 'bébé' , color: '#5BBCFF', iconClass: 'fa-solid fa-baby'},
    { name: 'Enfant', value: 'enfant', color: '#91DDCF', iconClass: 'fa-solid fa-child-reaching' },
    { name: 'Grossesse', value: 'grossesse', color: '#667BC6', iconClass: 'fa-solid fa-person-pregnant'  },
    { name: 'Préconception', value: 'préconception', color: '#FF0000', iconClass: 'fa-solid fa-heart-pulse' }
  ];

  selectCategory(category: string) {
    this.selectedCategory = category;
  }


  currentPage = 1;
  articlesPerPage = 4;

}
