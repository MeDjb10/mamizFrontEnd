import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { AuthServiceService } from 'src/app/serverSide/auth/auth-service.service';
import { DepotService } from 'src/app/serverSide/services/depot.service';

@Component({
  selector: 'app-list-depot',
  templateUrl: './list-depot.component.html',
  styleUrls: ['./list-depot.component.css']
})
export class ListDepotComponent implements OnChanges {
  @Input() category!: string;
  depots: any[] = [];
  filteredDepots: any[] = [];

  constructor(
    private depotService: DepotService,
    private auth: AuthServiceService,
  ) {}

  ngOnInit(): void {
    this.loadDepots();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['category']) {
      this.loadDepots();
    }
  }

  private loadDepots(): void {
    const userId = this.auth.getCurrentUserId();
    if (userId) {
      this.depotService.getDepotsByUser(Number(userId)).subscribe((depots) => {
        this.depots = depots;
        this.filterDepots();
      });
    }
  }

  private filterDepots(): void {
    this.filteredDepots = this.depots.filter(data => data.status === this.category);
  }

  deleteDepot(id: number): void {
    this.depotService.delete(id).subscribe(() => {
      this.depots = this.depots.filter((depot) => depot.id !== id);
      this.filterDepots(); 
    });
  }
}
