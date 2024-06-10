import { Component } from '@angular/core';
import { DepotService } from 'src/app/serverSide/services/depot.service';

@Component({
  selector: 'app-depot',
  templateUrl: './depot.component.html',
  styleUrls: ['./depot.component.css'],
})
export class DepotComponent {
  depots!: any[]; // Adjust the type as needed

  constructor(private depotService: DepotService) {}

  ngOnInit(): void {
    this.depotService.getAll().subscribe((data: any[]) => {
      this.depots = data;
    });
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
