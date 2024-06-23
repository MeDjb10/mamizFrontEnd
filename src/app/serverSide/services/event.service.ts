import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Event } from '../classes/event';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private baseUrl = 'http://localhost:8080/api/events';
  private eventsSubject: BehaviorSubject<Event[]> = new BehaviorSubject<Event[]>(
    [],
  );
  public events$: Observable<Event[]> = this.eventsSubject.asObservable();

  constructor(private http: HttpClient) {
    
  }
  loadAll(): Observable<Event[]> {
    return this.http.get<Event[]>(this.baseUrl).pipe(
      tap(events => this.eventsSubject.next(events))
    );
  }

  getById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.baseUrl}/${id}`);
  }

  create(event: Event): Observable<Event> {
    return this.http
      .post<Event>(this.baseUrl, event)
      .pipe(tap(() => this.loadAll()));
  }

  update(id: number, event: Event): Observable<Event> {
    return this.http
      .put<Event>(`${this.baseUrl}/${id}`, event)
      .pipe(tap(() => this.loadAll()));
  }

  delete(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(tap(() => this.loadAll()));
  }
}
