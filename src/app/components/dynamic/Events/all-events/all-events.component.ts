import { Component } from '@angular/core';
import { EventService } from 'src/app/serverSide/services/event.service';
import { Event } from 'src/app/serverSide/classes/event';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.css'],
})
export class AllEventsComponent {
  events: Event[] = [];
  filteredEvents: any[] = [];
  constructor(private eventService: EventService,private router:Router) {}

  ngOnInit(): void {
    this.eventService.events$.subscribe((events) => {
      this.events = events;
      this.filteredEvents = events;
    });

    this.eventService.loadAll();
  }

  onFilterChange(filter: any) {
    this.filteredEvents = this.events.filter((event) => {
      const matchesTitle = filter.title
        ? event.title.toLowerCase().includes(filter.title.toLowerCase())
        : true;

      const matchesDate = filter.date
        ? new Date(event.date).toDateString() ===
          new Date(filter.date).toDateString()
        : true;
      return matchesTitle && matchesDate;
    });
  }

  navigateToDetails(id: string): void {
    this.router.navigate(['home/event-details', id]);
  }
}
