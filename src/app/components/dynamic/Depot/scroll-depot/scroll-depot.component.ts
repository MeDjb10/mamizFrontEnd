import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepotService } from 'src/app/serverSide/services/depot.service';

@Component({
  selector: 'app-scroll-depot',
  templateUrl: './scroll-depot.component.html',
  styleUrls: ['./scroll-depot.component.css']
})
export class ScrollDepotComponent {
  constructor(
    private depotService: DepotService,
    private router: Router
  ) { }

  depots!: any[]; // Adjust the type as needed
  
  ngOnInit(): void {
    
    this.depotService.getApprovedDepots().subscribe((data: any[]) => {
      this.depots = data;
    });
  }

  navigateToDetails(id: any): void {
    this.router.navigate(['home/depot/depot-details',id]);
  }

  scrollLeft() {
    const scrollContainer = document.getElementById('scrollContainer');
    if (scrollContainer) {
      scrollContainer.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
    }
  }

  scrollRight() {
    const scrollContainer = document.getElementById('scrollContainer');
    if (scrollContainer) {
      scrollContainer.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
    }
  }
}
