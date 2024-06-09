import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReactionType } from '../classes/reaction-type';
import { Reaction } from '../classes/reaction';


@Injectable({
  providedIn: 'root',
})
export class ReactionService {
  private baseUrl = 'http://localhost:8080/api/reactions';

  constructor(private http: HttpClient) {}

  addReaction(
    userId: number,
    articleId: number,
    type: ReactionType,
  ): Observable<Reaction> {
    const params = new HttpParams()
      .set('userId', userId)
      .set('articleId', articleId)
      .set('type', type);
    return this.http.post<Reaction>(this.baseUrl, null, { params });
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
