import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from '../classes/admin';
import { Post } from '../classes/post';
import { Depot } from '../classes/depot';
// Adjust path as necessary

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private baseUrl = 'http://localhost:8080/admin'; // Adjust the port and path as necessary

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getAllAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(`${this.baseUrl}`);
  }

  getPendingPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/posts/pending`);
  }

  getPendingDepots(): Observable<Depot[]> {
    return this.http.get<Depot[]>(`${this.baseUrl}/depots/pending`);
  }

  approvePost(postId: number): Observable<Post> {
    return this.http.put<Post>(
      `${this.baseUrl}/posts/${postId}/approve`,
      this.httpOptions,
    );
  }

  rejectPost(postId: number): Observable<Post> {
    return this.http.put<Post>(
      `${this.baseUrl}/posts/${postId}/reject`,
      this.httpOptions,
    );
  }

  approveDepot(depotId: number): Observable<Depot> {
    return this.http.put<Depot>(
      `${this.baseUrl}/depots/${depotId}/approve`,
      this.httpOptions,
    );
  }

  rejectDepot(depotId: number): Observable<Depot> {
    return this.http.put<Depot>(
      `${this.baseUrl}/depots/${depotId}/reject`,
      this.httpOptions,
    );
  }
}
