import { Component } from '@angular/core';

@Component({
  selector: 'app-user-posts-div',
  templateUrl: './user-posts-div.component.html',
  styleUrls: ['./user-posts-div.component.css']
})
export class UserPostsDivComponent {
  selectedCategory = 'approved';
  showPostList = false; 
  categories = [
    { name: 'Accepté', value: 'approved' , color: '#3aa6b9', iconClass: 'fa-solid fa-check'},
    { name: 'En Attente', value: 'pending' , color: '#007bff', iconClass: 'fa-solid fa-hourglass-end'},
    { name: 'Rejecté', value: 'rejected', color: '#ff687b', iconClass: 'fa-solid fa-xmark' },
  ];
  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  toggleDepotList() {
    this.showPostList = !this.showPostList;
  }
}
