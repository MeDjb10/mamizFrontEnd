import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AtelierService } from 'src/app/serverSide/services/atelier.service';


@Component({
  selector: 'app-ateliers',
  templateUrl: './ateliers.component.html',
  styleUrls: ['./ateliers.component.css'],
})
export class AteliersComponent implements OnInit {
  ateliers!: any[]; // Adjust the type as needed

  constructor(
    private atelierService: AtelierService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.atelierService.getAllAteliers().subscribe((data: any[]) => {
      // Adjust the type as needed
      this.ateliers = data;
    });
  }
  navigateToDetails(id: string): void {
    this.router.navigate(['home/atelier-details', id]);
  }
}