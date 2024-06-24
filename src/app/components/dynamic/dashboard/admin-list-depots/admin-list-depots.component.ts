import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Depot } from 'src/app/serverSide/classes/depot';
import { User } from 'src/app/serverSide/classes/user';
import { DepotService } from 'src/app/serverSide/services/depot.service';
import { UserService } from 'src/app/serverSide/services/user.service';

@Component({
  selector: 'app-admin-list-depots',
  templateUrl: './admin-list-depots.component.html',
  styleUrls: ['./admin-list-depots.component.css']
})
export class AdminListDepotsComponent {
  depot: any[] = [];
  filteredDepots: any[] = [];
  statuses: any[] = []
  visible: boolean = false;
  images:any[]=[];
  selectedDepot: any = null;

  constructor(
    private depotService: DepotService,
  ) {
    this.statuses = [
      { name: 'approved', value: 'approved' },
      { name: 'pending', value: 'pending' },
      { name: 'rejected', value: 'rejected' },
    ];
    this.images = [
      {
        itemImageSrc: 'assets/useful stuff/Studentinclassroom.jpeg',
        thumbnailImageSrc: 'assets/useful stuff/Studentinclassroom.jpeg',
      },
      {
        itemImageSrc: 'assets/useful stuff/poussette.jpg',
        thumbnailImageSrc: 'assets/useful stuff/poussette.jpg',
      },
      {
        itemImageSrc: 'assets/useful stuff/Studentinclassroom.jpeg',
        thumbnailImageSrc: 'assets/useful stuff/Studentinclassroom.jpeg',
      },
      {
        itemImageSrc: 'assets/useful stuff/poussette.jpg',
        thumbnailImageSrc: 'assets/useful stuff/poussette.jpg',
      },
      {
        itemImageSrc: 'assets/useful stuff/Studentinclassroom.jpeg',
        thumbnailImageSrc: 'assets/useful stuff/Studentinclassroom.jpeg',
      },
      {
        itemImageSrc: 'assets/useful stuff/poussette.jpg',
        thumbnailImageSrc: 'assets/useful stuff/poussette.jpg',
      },

      // add more images as needed
    ];
  }
  ngOnInit(): void {
    this.loadUsers();
  }
  getStatusClass(status: string): string {
    switch (status) {
      case 'approved':
        return 'bg-green-500 text-white font-bold w-fit px-2 py-1 rounded';
      case 'pending':
        return 'bg-yellow-400 text-white font-bold w-fit px-2 py-1 rounded';
      case 'rejected':
        return 'bg-red-500 text-white font-bold w-fit px-2 py-1 rounded';
      default:
        return 'bg-gray-500 text-white font-bold w-fit px-2 py-1 rounded';
    }
  }
  loadUsers() {
    this.depotService.getAll().subscribe(data => {
      this.depot = data;
      this.filteredDepots = data
    }
    );
  }


  onSearchChange(event: Event) {
    const input = (event.target as HTMLInputElement).value.toLowerCase();
    if (input === '') {
      this.filteredDepots = this.depot;
    } else {
      this.filteredDepots = this.depot.filter(data =>
        (data.nom ? data.nom.toLowerCase().includes(input) : false) ||
        (data.prenom ? data.prenom.toLowerCase().includes(input) : false) ||
        (data.email ? data.email.toLowerCase().includes(input) : false)
      );
    }
  }
  showDialog(depot: any) {
    this.selectedDepot = depot;
    this.visible = true;
  }

  
  updateDepotStatus(Depot: Depot, status: string) {
    const updatedDepot = { ...Depot, status: status };
    this.visible = !this.visible;
    console.log('Updating Depot:', updatedDepot); // Log the updated Depot

    this.depotService.update(Depot.id, updatedDepot).subscribe({
      next: (updated) => { 
        Depot.status = status;
        console.log('Depot updated successfully', updated); // Log success
       
      },
      error: (err) => {
        console.error('Error updating Depot status', err); // Log error
      }
    });
  }
}
