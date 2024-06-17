import { Component } from '@angular/core';
import { MedcinService } from 'src/app/serverSide/services/medcin.service';

@Component({
  selector: 'app-list-medcin',
  templateUrl: './list-medcin.component.html',
  styleUrls: ['./list-medcin.component.css'],
})
export class ListMedcinComponent {
  medcins: any[] = [];
  filteredMedcins: any[]=[];
  constructor(private medcinService: MedcinService) {}

  ngOnInit(): void {
    this.medcinService.getAll().subscribe((medcins) => {
      this.medcins = medcins;
      this.filteredMedcins=medcins;
      console.log(medcins);
    });
    
  }

  onSearchChange(event: Event) {
    const input = (event.target as HTMLInputElement).value.toLowerCase();
    if(input===''){
      this.filteredMedcins=this.medcins;
    }else{
    this.filteredMedcins = this.medcins.filter(medcin =>
      (medcin.nom ? medcin.nom.toLowerCase().includes(input) : false) ||
      (medcin.specialite ? medcin.specialite.toLowerCase().includes(input) : false)
    );}
  }
}
