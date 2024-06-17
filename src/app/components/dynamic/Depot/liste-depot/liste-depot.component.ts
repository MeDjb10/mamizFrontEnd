import { Component } from '@angular/core';
import { DepotService } from 'src/app/serverSide/services/depot.service';

@Component({
  selector: 'app-liste-depot',
  templateUrl: './liste-depot.component.html',
  styleUrls: ['./liste-depot.component.css']
})
export class ListeDepotComponent {
  depots!: any[]; 

  constructor(private depotService: DepotService) {}

  ngOnInit(): void {
    this.depotService.getApprovedDepots().subscribe((data: any[]) => {
      this.depots = data;
    });
  }
}
