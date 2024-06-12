// post.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from '../classes/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private baseUrl = 'http://localhost:8080/api/posts';
  private postSubject: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>(
    [],
  );
  public posts$: Observable<Post[]> = this.postSubject.asObservable();

  constructor(private http: HttpClient) {
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.http.get<Post[]>(this.baseUrl).subscribe((posts) => {
      this.postSubject.next(posts);
    });
  }

  addPost(post: Post): void {
    this.http.post<Post>(this.baseUrl, post).subscribe((newPost) => {
      const currentPosts = this.postSubject.value;
      this.postSubject.next([...currentPosts, newPost]);
    });
  }

  getById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/${id}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  update(id: number, post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.baseUrl}/${id}`, post);
  }
}
