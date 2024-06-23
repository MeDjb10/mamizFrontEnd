import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/serverSide/services/event.service';

@Component({
  selector: 'app-admin-list-event',
  templateUrl: './admin-list-event.component.html',
  styleUrls: ['./admin-list-event.component.css']
})
export class AdminListEventComponent {
  events: any[] = [];
  filteredevents: any[] = [];

  constructor(
    private eventService: EventService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadevents();
  }

  delete(id: number): void {
    this.eventService.delete(id).subscribe(
      () => {
        this.events = this.events.filter(event => event.id !== id);
        this.filteredevents = this.filteredevents.filter(event => event.id !== id);
      },
      error => console.error('Error deleting event:', error)
    );
  }


  loadevents() {
    this.eventService.getAll().subscribe((data: any[]) => {
      this.events = data;
      this.filteredevents = data;
    });
  }

  
  onSearchChange(event: Event) {
    const input = (event.target as HTMLInputElement).value.toLowerCase();
    if(input===''){
      this.filteredevents=this.events;
    }else{
    this.filteredevents = this.events.filter(data =>
      (data.title ? data.title.toLowerCase().includes(input) : false) ||
      (data.description ? data.description.toLowerCase().includes(input) : false)
    );}
  }
}
