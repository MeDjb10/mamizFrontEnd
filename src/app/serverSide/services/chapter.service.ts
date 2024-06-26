import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chapter } from '../classes/chapter';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {
  private baseUrl = 'http://localhost:8080/api/chapters';

  constructor(private http: HttpClient) {}

  

  update(id: number, Chapter: Chapter): Observable<Chapter> {
    return this.http.put<Chapter>(`${this.baseUrl}/${id}`, Chapter);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
