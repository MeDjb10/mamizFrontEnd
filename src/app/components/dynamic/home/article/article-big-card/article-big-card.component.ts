import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-article-big-card',
  templateUrl: './article-big-card.component.html',
  styleUrls: ['./article-big-card.component.css'],
})
export class ArticleBigCardComponent {
  @Input() theme?: string;
  @Input() title?: string;
  @Input() pic?: string;

  categories = [
    { name: 'Tous les articles', value: '', color: '#007F73' },
    { name: 'Maman', value: 'maman', color: '#FF9EAA'},
    { name: 'Bébé', value: 'bébé', color: '#5BBCFF' },
    { name: 'Enfant', value: 'enfant', color: '#91DDCF'},
    { name: 'Grossesse', value: 'grossesse', color: '#667BC6' },
    { name: 'Préconception', value: 'préconception', color: '#FF0000' }
  ];
  getThemeColor(theme: string): string {
    const category = this.categories.find(cat => cat.value === theme);
    return category ? category.color : '#007F73'; // Default color
  }
}
