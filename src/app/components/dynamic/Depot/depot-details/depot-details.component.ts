import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepotService } from 'src/app/serverSide/services/depot.service';

import { Location } from '@angular/common';
import { Subscription, switchMap } from 'rxjs';
@Component({
  selector: 'app-depot-details',
  templateUrl: './depot-details.component.html',
  styleUrls: ['./depot-details.component.css'],
})
export class DepotDetailsComponent implements OnInit {
  images: any[];
  responsiveOptions: any[];
  depot: any;
  constructor(
    private depotService: DepotService,
    private route: ActivatedRoute,
    private location: Location,
    private router:Router

  ) {
    this.images = [
      {
        itemImageSrc: 'assets/useful stuff/Studentinclassroom.jpeg',
        thumbnailImageSrc: 'assets/useful stuff/Studentinclassroom.jpeg',
      },
      {
        itemImageSrc: 'assets/useful stuff/poussette.jpg',
        thumbnailImageSrc: 'assets/useful stuff/poussette.jpg',
      },
      {
        itemImageSrc: 'assets/useful stuff/Studentinclassroom.jpeg',
        thumbnailImageSrc: 'assets/useful stuff/Studentinclassroom.jpeg',
      },
      {
        itemImageSrc: 'assets/useful stuff/poussette.jpg',
        thumbnailImageSrc: 'assets/useful stuff/poussette.jpg',
      },
      {
        itemImageSrc: 'assets/useful stuff/Studentinclassroom.jpeg',
        thumbnailImageSrc: 'assets/useful stuff/Studentinclassroom.jpeg',
      },
      {
        itemImageSrc: 'assets/useful stuff/poussette.jpg',
        thumbnailImageSrc: 'assets/useful stuff/poussette.jpg',
      },

      // add more images as needed
    ];

    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 5,
      },
      {
        breakpoint: '768px',
        numVisible: 3,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
      },
    ];
  } // Adjust the type as needed

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      switchMap((params) => {
        const id = Number(params.get('id'));
        return this.depotService.getById(id);
      })
    )
    .subscribe((depot) => {
      this.depot = depot;
    });

    // const id = Number(this.route.snapshot.paramMap.get('id'));
    // if (id) {
    //   this.depotService.getById(id).subscribe((depot) => {
    //     this.depot = depot;
    //   });
    // }
  }
  goBack(): void {
    this.location.back();
  }
}
