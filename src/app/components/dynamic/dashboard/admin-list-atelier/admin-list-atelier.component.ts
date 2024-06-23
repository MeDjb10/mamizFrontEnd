import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AtelierService } from 'src/app/serverSide/services/atelier.service';

@Component({
  selector: 'app-admin-list-atelier',
  templateUrl: './admin-list-atelier.component.html',
  styleUrls: ['./admin-list-atelier.component.css']
})
export class AdminListAtelierComponent {
  ateliers: any[] = [];
  filteredAteliers: any[] = [];
  users: any[] = [];
  visible: boolean = false;

  constructor(
    private atelierService: AtelierService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadAteliers();
  }

  delete(id: number) {
    this.atelierService.delete(id).subscribe(
      data => console.log(data)
    );
  }

  showDialog(id: number) {
    this.visible = true;
    console.log(id);

    this.atelierService.getSubscribers(id).subscribe(
      data => this.users = data
    ) ;
    console.log(this.users)
  }

  loadAteliers() {
    this.atelierService.getAll().subscribe((data) => {
      this.ateliers = data;
      this.filteredAteliers = data;
    });
  }


  onSearchChange(event: Event) {
    const input = (event.target as HTMLInputElement).value.toLowerCase();
    if (input === '') {
      this.filteredAteliers = this.ateliers;
    } else {
      this.filteredAteliers = this.ateliers.filter(data =>
        (data.title ? data.title.toLowerCase().includes(input) : false) ||
        (data.description ? data.description.toLowerCase().includes(input) : false)
      );
    }
  }


}
