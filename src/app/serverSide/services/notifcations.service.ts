import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from '../classes/notifications';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly API_URL = 'http://localhost:8080/api/notifications';

  constructor(private http: HttpClient) {}

  getUnreadNotifications(userId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.API_URL}/unread/${userId}`);
  }

  markAllAsRead(userId: number): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/markAsRead/${userId}`, {});
  }
}
