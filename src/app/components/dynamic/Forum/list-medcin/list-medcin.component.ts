import { Component } from '@angular/core';
import { MedcinService } from 'src/app/serverSide/services/medcin.service';

@Component({
  selector: 'app-list-medcin',
  templateUrl: './list-medcin.component.html',
  styleUrls: ['./list-medcin.component.css'],
})
export class ListMedcinComponent {
  medcins: any[] = [];

  constructor(private medcinService: MedcinService) {}

  ngOnInit(): void {
    this.medcinService.getAll().subscribe((medcins) => {
      this.medcins = medcins;
    });
  }
}
