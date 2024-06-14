import { Component } from '@angular/core';

@Component({
  selector: 'app-depot-details',
  templateUrl: './depot-details.component.html',
  styleUrls: ['./depot-details.component.css']
})
export class DepotDetailsComponent {
  images: any[];
  responsiveOptions: any[];

  constructor() {
    this.images = [
      { itemImageSrc: 'assets/useful stuff/Studentinclassroom.jpeg', thumbnailImageSrc: 'assets/useful stuff/Studentinclassroom.jpeg' },
      { itemImageSrc: 'assets/useful stuff/poussette.jpg', thumbnailImageSrc: 'assets/useful stuff/poussette.jpg' },
      // add more images as needed
    ];

    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 5
      },
      {
        breakpoint: '768px',
        numVisible: 3
      },
      {
        breakpoint: '560px',
        numVisible: 1
      }
    ];
  }

  ngOnInit(): void {
    // Any initialization logic can go here
  }
}
