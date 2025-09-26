import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { VisionRouteData } from 'src/store/page/_types';
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

  // getVisionPageData(): Observable<VisionRouteData> {
  //   return forkJoin([this.getYoutubeVideoLink()]).pipe(
  //     map(([youtube]) => ({
  //       video: youtube,
  //     }))
  //   );
  // }

  getVisionPageData(): Observable<VisionRouteData> {
    const params = new HttpParams().set('order', 'id.asc');
    return this.http
      .get<VisionRouteData[]>(`${VITE_SUPABASE_URL}/rest/v1/video`, {
        headers: this.headers,
        params,
      })
      .pipe(map(([item]) => item));
  }
}
