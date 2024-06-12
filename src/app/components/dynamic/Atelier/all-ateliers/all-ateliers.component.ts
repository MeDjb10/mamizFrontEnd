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
      this.filteredAteliers = data; // Initialize filteredPosters with all posters
    });
  }

  onFilterChange(filter: any) {
    this.filteredAteliers = this.ateliers.filter((data) => {
      const matchesArtist = filter.artist
        ? data.artist.toLowerCase().includes(filter.artist.toLowerCase())
        : true;
      const matchesPrice =
        data.price >= filter.priceMin && data.price <= filter.priceMax;
      const matchesDate = filter.date
        ? new Date(data.date).toDateString() ===
          new Date(filter.date).toDateString()
        : true;

      return matchesArtist && matchesPrice && matchesDate;
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
