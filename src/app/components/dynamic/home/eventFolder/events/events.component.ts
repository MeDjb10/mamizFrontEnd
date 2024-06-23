import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/serverSide/services/event.service';
import { Event } from 'src/app/serverSide/classes/event';
import { Router } from '@angular/router';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  events: Event[] = [];

  constructor(
    private eventService: EventService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.eventService.getAll().subscribe((events) => {
      this.events = events;
    });
    console.log(this.events);
  
  }

  navigateToDetails(id: any): void {
    this.router.navigate(['home/event-details', id]);
  }
}