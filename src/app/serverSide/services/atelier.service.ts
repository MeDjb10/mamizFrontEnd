import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Atelier } from '../classes/atelier';
import { User } from '../classes/user';


@Injectable({
  providedIn: 'root',
})
export class AtelierService {
  private baseUrl = 'http://localhost:8080/api/ateliers';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Atelier[]> {
    return this.http.get<Atelier[]>(this.baseUrl);
  }

  getById(id: number): Observable<Atelier> {
    return this.http.get<Atelier>(`${this.baseUrl}/${id}`);
  }

  create(atelier: Atelier): Observable<Atelier> {
    return this.http.post<Atelier>(this.baseUrl, atelier);
  }

  update(id: number, atelier: Atelier): Observable<Atelier> {
    return this.http.put<Atelier>(`${this.baseUrl}/${id}`, atelier);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getSubscribers(atelierId: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/${atelierId}/subscribers`);
  }
}
