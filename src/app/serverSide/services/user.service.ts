import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../classes/user';
import { Atelier } from '../classes/atelier';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/email/${email}`);
  }

  getAteliersByUser(userId: number): Observable<Atelier[]> {
    return this.http.get<Atelier[]>(`${this.baseUrl}/${userId}/ateliers`);
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  subscribeToAtelier(userId: number, atelierId: number): Observable<string> {
    return this.http.post<string>(
      `${this.baseUrl}/${userId}/subscribe/${atelierId}`,
      {},
    );
  }

  updateUser(user: User): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${user.id}`, user);
  }
}
