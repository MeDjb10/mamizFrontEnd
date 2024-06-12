import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AtelierService } from 'src/app/serverSide/services/atelier.service';

@Component({
  selector: 'app-all-ateliers',
  templateUrl: './all-ateliers.component.html',
  styleUrls: ['./all-ateliers.component.css'],
})
export class AllAteliersComponent {
  ateliers: any[] = [];
  filteredAteliers: any[] = [];

  constructor(
    private atelierService: AtelierService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadAteliers();
  }

  loadAteliers() {
    this.atelierService.getAll().subscribe((data) => {
      this.ateliers = data;
      this.filteredAteliers = data; // Initialize filteredAteliers with all ateliers
    });
  }

  onFilterChange(filter: any) {
    this.filteredAteliers = this.ateliers.filter((atelier) => {
      const matchesTitle = filter.title
        ? atelier.title.toLowerCase().includes(filter.title.toLowerCase())
        : true;
      const matchesPrice =
        atelier.price >= filter.priceMin && atelier.price <= filter.priceMax;
      const matchesDate = filter.date
        ? new Date(atelier.date).toDateString() ===
          new Date(filter.date).toDateString()
        : true;
      return matchesTitle && matchesPrice && matchesDate;
    });

    if (filter.priceSort === 'asc') {
      this.filteredAteliers.sort((a, b) => a.price - b.price);
    } else if (filter.priceSort === 'desc') {
      this.filteredAteliers.sort((a, b) => b.price - a.price);
    }
  }

  navigateToDetails(id: string): void {
    this.router.navigate(['home/atelier-details', id]);
  }
}
