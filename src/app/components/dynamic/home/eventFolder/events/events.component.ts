import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/serverSide/services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  events!: any[]; // Adjust the type as needed

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getAll().subscribe((data: any[]) => {
      this.events = data;
    });
  }
}