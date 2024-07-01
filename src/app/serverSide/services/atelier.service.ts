import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Atelier } from '../classes/atelier';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root',
})
export class AtelierService {
  baseUrl = 'http://localhost:8080/api/ateliers'; // Adjust if your base URL is different

  constructor(private http: HttpClient) {}

  getAllAteliers(): Observable<Atelier[]> {
    return this.http
      .get<Atelier[]>(this.baseUrl)
      .pipe(catchError(this.handleError));
  }

  getAtelierById(id: number): Observable<Atelier> {
    return this.http
      .get<Atelier>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  createAtelier(file: File, atelierDTO: string): Observable<Atelier> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('atelierDTO', atelierDTO);

    return this.http
      .post<Atelier>(`${this.baseUrl}/add-atelier`, formData)
      .pipe(catchError(this.handleError));
  }

  subscribeToAtelier(
    userId: number,
    atelierId: number,
  ): Observable<Map<string, string>> {
    return this.http
      .post<
        Map<string, string>
      >(`${this.baseUrl}/${userId}/subscribe/${atelierId}`, null)
      .pipe(catchError(this.handleError));
  }

  updateAtelier(
    id: number,
    file: File | null,
    atelierDTO: string,
  ): Observable<Atelier> {
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    formData.append('atelierDTO', atelierDTO);

    return this.http
      .put<Atelier>(`${this.baseUrl}/update/${id}`, formData)
      .pipe(catchError(this.handleError));
  }

  deleteAtelier(id: number): Observable<string> {
    return this.http
      .delete<string>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getSubscribers(atelierId: number): Observable<User[]> {
    return this.http
      .get<User[]>(`${this.baseUrl}/${atelierId}/subscribers`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 409:
          errorMessage = 'File already exists!';
          break;
        case 404:
          errorMessage = 'Resource not found!';
          break;
        case 500:
          errorMessage = 'Internal server error!';
          break;
        default:
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          break;
      }
    }
    return throwError(errorMessage);
  }
}
