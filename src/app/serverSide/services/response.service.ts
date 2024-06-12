import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
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

  addResponse(response: Response): void {
    this.http
      .post<Response>(this.baseUrl, response)
      .subscribe((newResponse) => {
        const currentResponses = this.responseSubject.value;
        this.responseSubject.next([...currentResponses, newResponse]);
      });
  }
}
