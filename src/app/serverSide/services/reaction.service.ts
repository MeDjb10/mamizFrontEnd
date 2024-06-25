import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { catchError, retryWhen, delay, take } from 'rxjs/operators';
import { ReactionType } from '../enum/reaction-type';
import { Reaction } from '../classes/reaction';


@Injectable({
  providedIn: 'root',
})
export class ReactionService {
  private baseUrl = 'http://localhost:8080/api/reactions';

  constructor(private http: HttpClient) { }

  addReaction(
    userId: number,
    articleId: number,
    type: ReactionType,
  ): Observable<Reaction> {
    const body = {
      userId: userId,
      articleId: articleId,
      type: type.toString() // Assuming type needs to be converted to string
    };
    const params = new HttpParams()
      .set('userId', userId)
      .set('articleId', articleId)
      .set('type', type);
    return this.http.post<Reaction>(this.baseUrl, body, { params }).pipe(
      retryWhen(errors =>
        errors.pipe(
          delay(1000), // Delay for 1 second before retrying
          take(3), // Retry up to 3 times
          catchError(err => throwError(err)) // Throw error if retries are exhausted
        )
      )
    );
  }

  countReactionsByType(
    articleId: number,
  ): Observable<Map<ReactionType, number>> {
    const params = new HttpParams().set('articleId', articleId);
    return this.http.get<Map<ReactionType, number>>(`${this.baseUrl}/count`, {
      params,
    });
  }

  removeReaction(userId: number, articleId: number): Observable<void> {
    const params = new HttpParams()
      .set('userId', userId)
      .set('articleId', articleId);
    return this.http.delete<void>(this.baseUrl, { params });
  }
}
