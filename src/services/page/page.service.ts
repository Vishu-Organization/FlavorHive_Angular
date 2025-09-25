import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { VisionRouteData, VisionVideoItem } from 'src/store/page/_types';
import { VITE_SUPABASE_URL } from 'src/store/types/urls';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  private headers = new HttpHeaders({
    'Accept-Profile': 'our_vision',
    'Content-Profile': 'our_vision',
  });
  private http = inject(HttpClient);

  getVisionPageData(): Observable<VisionRouteData> {
    return forkJoin([this.getYoutubeVideoLink()]).pipe(map(([youtube]) => ({
      video: youtube
    })));
  }

  getYoutubeVideoLink(): Observable<VisionVideoItem> {
    const params = new HttpParams().set('order', 'id.asc');
    return this.http
      .get<VisionVideoItem[]>(`${VITE_SUPABASE_URL}/rest/v1/video`, {
        headers: this.headers,
        params,
      })
      .pipe(map(([item]) => item));
  }
}
