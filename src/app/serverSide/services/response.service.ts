import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Response } from '../classes/response';

@Injectable({
  providedIn: 'root',
})
export class ResponseService {
  private baseUrl = 'http://localhost:8080/api/responses';
  private responseSubject: BehaviorSubject<Response[]> = new BehaviorSubject<
    Response[]
  >([]);
  public responses$: Observable<Response[]> =
    this.responseSubject.asObservable();

  constructor(private http: HttpClient) {
    this.fetchResponses();
  }

  fetchResponses(): void {
    this.http.get<Response[]>(this.baseUrl).subscribe((responses) => {
      this.responseSubject.next(responses);
    });
  }

  createResponse(
    postId: number,
    medcinId: number,
    response: Response,
  ): Observable<Response> {
    return this.http
      .post<Response>(
        `${this.baseUrl}/post/${postId}/medcin/${medcinId}`,
        response,
      )
      .pipe(
        tap((newResponse) => {
          const currentResponses = this.responseSubject.value;
          this.responseSubject.next([...currentResponses, newResponse]);
        }),
      );
  }

  deleteResponse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap(() => {
        const currentResponses = this.responseSubject.value;
        this.responseSubject.next(
          currentResponses.filter((response) => response.id !== id),
        );
      }),
    );
  }
}
