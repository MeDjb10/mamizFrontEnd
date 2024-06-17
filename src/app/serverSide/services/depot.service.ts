import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Depot } from '../classes/depot';


@Injectable({
  providedIn: 'root',
})
export class DepotService {
  private baseUrl = 'http://localhost:8080/api/depots';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Depot[]> {
    return this.http.get<Depot[]>(this.baseUrl);
  }

  getApprovedDepots(): Observable<Depot[]> {
    return this.http.get<Depot[]>(`${this.baseUrl}/approved`);
  }

  getById(id: number): Observable<Depot> {
    return this.http.get<Depot>(`${this.baseUrl}/${id}`);
  }

  create(depot: Depot): Observable<Depot> {
    return this.http.post<Depot>(this.baseUrl, depot);
  }

  update(id: number, depot: Depot): Observable<Depot> {
    return this.http.put<Depot>(`${this.baseUrl}/${id}`, depot);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
