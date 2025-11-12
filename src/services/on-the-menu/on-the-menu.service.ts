import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SelectorMap } from 'src/store/home/_interfaces';
import { RecipesResponse } from 'src/store/on-the-menu/_types';

@Injectable({
  providedIn: 'root',
})
export class OnTheMenuService {
  private appId = '7f563e49';
  private appKeys = [
    '4be7f47dd4dc6fd6ed0b7644e352f6aa',
    '7bbf70c600c349da70d8d807a2949f29',
  ];
  private http = inject(HttpClient);

  private getBaseUrl(): string {
    return `https://api.edamam.com/api/recipes/v2`;
  }

  private buildParams(selectorMap: SelectorMap): HttpParams {
    const params = {
      type: 'public',
      app_id: this.appId,
      app_key: this.appKeys[Math.floor(Math.random() * this.appKeys.length)],
      ...selectorMap,
    };

    return new HttpParams({ fromObject: params });
  }

  loadOnTheMenuRecipes(selectorMap: SelectorMap): Observable<RecipesResponse> {
    const params = this.buildParams(selectorMap);
    return this.http.get<RecipesResponse>(this.getBaseUrl(), { params });
  }

  loadMoreOnTheMenuRecipes(url: string): Observable<RecipesResponse> {
    return this.http.get<RecipesResponse>(url);
  }
}
