import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medcin } from '../classes/medcin';


@Injectable({
  providedIn: 'root',
})
export class MedcinService {
  private baseUrl = 'http://localhost:8080/api/medcins';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Medcin[]> {
    return this.http.get<Medcin[]>(this.baseUrl);
  }

  getById(id: number): Observable<Medcin> {
    return this.http.get<Medcin>(`${this.baseUrl}/${id}`);
  }

  create(medcin: Medcin): Observable<Medcin> {
    return this.http.post<Medcin>(this.baseUrl, medcin);
  }

  update(id: number, medcin: Medcin): Observable<Medcin> {
    return this.http.put<Medcin>(`${this.baseUrl}/${id}`, medcin);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
