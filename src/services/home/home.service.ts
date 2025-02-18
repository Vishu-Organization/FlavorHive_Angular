import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MealsShipped } from 'src/store/home/_interfaces';
import { HomeState } from 'src/store/home/reducer';
import { selectMealsShippedData, selectMealsShippedError, selectMealsShippedLoading } from 'src/store/home/selectors';
import { VITE_SUPABASE_URL } from 'src/store/types/urls';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  mealsShippedData$: Observable<MealsShipped[]>;
  mealsShippedLoading$: Observable<boolean>;
  mealsShippedError$: Observable<string | null>;

  constructor(private http: HttpClient, private store: Store<HomeState>) {
    this.mealsShippedData$ = this.store.select(selectMealsShippedData);
    this.mealsShippedLoading$ = this.store.select(selectMealsShippedLoading);
    this.mealsShippedError$ = this.store.select(selectMealsShippedError);
  }

  getMealsShippedData(): Observable<MealsShipped[]> {
    const headers = new HttpHeaders({
      'Accept-Profile': 'home',
      'Content-Profile': 'home',
    });
    const params = new HttpParams()
      .set(
        'select',
        'id,image,name,description_primary, description_secondary, alt'
      )
      .set('order', 'id.asc');
    return this.http.get<MealsShipped[]>(
      `${VITE_SUPABASE_URL}/rest/v1/meals_shipped`,
      {
        params,
        headers,
      }
    );
  }
}
