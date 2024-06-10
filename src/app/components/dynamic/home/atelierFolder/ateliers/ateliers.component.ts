import { Component, OnInit } from '@angular/core';
import { AtelierService } from 'src/app/serverSide/services/atelier.service';


@Component({
  selector: 'app-ateliers',
  templateUrl: './ateliers.component.html',
  styleUrls: ['./ateliers.component.css']
})
export class AteliersComponent implements OnInit {
  ateliers!: any[]; // Adjust the type as needed

  constructor(private atelierService: AtelierService) { }

  ngOnInit(): void {
    this.atelierService.getAll().subscribe((data: any[]) => { // Adjust the type as needed
      this.ateliers = data;
    });
  }
}