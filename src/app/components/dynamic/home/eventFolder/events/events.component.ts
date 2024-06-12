import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/serverSide/services/event.service';
import { Event } from 'src/app/serverSide/classes/event';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  events: Event[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.events$.subscribe((events) => {
      this.events = events;
    });

    this.eventService.loadAll();
  }
}