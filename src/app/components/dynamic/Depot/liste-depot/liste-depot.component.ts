import { Component } from '@angular/core';
import { DepotService } from 'src/app/serverSide/services/depot.service';

@Component({
  selector: 'app-liste-depot',
  templateUrl: './liste-depot.component.html',
  styleUrls: ['./liste-depot.component.css']
})
export class ListeDepotComponent {
  depots!: any[];

  search: string = '';
  filtredDepots: any[] = [];
  constructor(private depotService: DepotService) { }

  ngOnInit(): void {
    this.depotService.getAll().subscribe((data: any[]) => {
      this.depots = data;
      this.filtredDepots = data;
    });
  }

  onSearchChanged(searchTerm: string) {
    this.search = searchTerm;
    this.applyFilters();
  }

  applyFilters() {
    if (!this.search) {
      this.filtredDepots = this.depots;
    } else {
      this.filtredDepots = this.depots.filter(data => {
        const matchesSearchTerm = !this.search ||
          data.name.toLowerCase().includes(this.search) ||
          data.description.toLowerCase().includes(this.search);
        return matchesSearchTerm;
      });
    }
  }
}
