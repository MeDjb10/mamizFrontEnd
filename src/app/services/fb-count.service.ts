import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FbCountService {
  // private pageId = 'your-page-id'; // Replace with your Facebook page ID
  // private accessToken = 'your-access-token'; // Replace with your access token
  // private graphApiUrl = `https://graph.facebook.com/v12.0/${this.pageId}?fields=followers_count&access_token=${this.accessToken}`;

  // constructor(private http: HttpClient) { }

  // getFollowersCount(): Observable<any> {
  //   return this.http.get<any>(this.graphApiUrl);
  // }
}
