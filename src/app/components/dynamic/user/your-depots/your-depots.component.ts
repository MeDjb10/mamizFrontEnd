import { Component } from '@angular/core';
import { AuthServiceService } from 'src/app/serverSide/auth/auth-service.service';
import { DepotService } from 'src/app/serverSide/services/depot.service';

@Component({
  selector: 'app-your-depots',
  templateUrl: './your-depots.component.html',
  styleUrls: ['./your-depots.component.css'],
})
export class YourDepotsComponent {
  depots: any[] = [];

  constructor(
    private depotService: DepotService,
    private auth: AuthServiceService,
  ) {}

  ngOnInit(): void {
    const userId = this.auth.getCurrentUserId();
    if (userId) {
      this.depotService.getDepotsByUser(Number(userId)).subscribe((depots) => {
        this.depots = depots;
      });
    }
  }

  deleteDepot(id: number): void {
    this.depotService.delete(id).subscribe(() => {
      this.depots = this.depots.filter((depot) => depot.id !== id);
    });
  }
}
