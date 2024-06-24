// post.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../classes/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private baseUrl = 'http://localhost:8080/api/posts';

  constructor(private http: HttpClient) {}

  fetchPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/approved`);
  }

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}`);
  }


  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.baseUrl, post);
  }

  getById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/${id}`);
  }

  getPostsByUser(userId: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/user/${userId}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  update(id: number, post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.baseUrl}/${id}`, post);
  }
}
