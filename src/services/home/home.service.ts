import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MealsShipped, Testimonial } from 'src/store/home/_interfaces';
import { HomeState } from 'src/store/home/reducer';
import {
  selectMealsShippedData,
  selectMealsShippedError,
  selectMealsShippedLoading,
  selectTestimonialsData,
  selectTestimonialsError,
  selectTestimonialsLoading,
} from 'src/store/home/selectors';
import { VITE_SUPABASE_URL } from 'src/store/types/urls';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  mealsShippedData$: Observable<MealsShipped[] | null>;
  mealsShippedLoading$: Observable<boolean>;
  mealsShippedError$: Observable<string | null>;

  testimonialsData$: Observable<Testimonial[] | null>;
  testimonialsLoading$: Observable<boolean>;
  testimonialsError$: Observable<string | null>;

  headers = new HttpHeaders({
    'Accept-Profile': 'home',
    'Content-Profile': 'home',
  });

  constructor(private http: HttpClient, private store: Store<HomeState>) {
    this.mealsShippedData$ = this.store.select(selectMealsShippedData);
    this.mealsShippedLoading$ = this.store.select(selectMealsShippedLoading);
    this.mealsShippedError$ = this.store.select(selectMealsShippedError);

    this.testimonialsData$ = this.store.select(selectTestimonialsData);
    this.testimonialsLoading$ = this.store.select(selectTestimonialsLoading);
    this.testimonialsError$ = this.store.select(selectTestimonialsError);
  }

  getMealsShippedData(): Observable<MealsShipped[]> {
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
        headers: this.headers,
      }
    );
  }

  getTestimonials(): Observable<Testimonial[]> {
    const params = new HttpParams()
      .set('select', 'id,name,description')
      .set('order', 'id.asc');
    return this.http.get<Testimonial[]>(
      `${VITE_SUPABASE_URL}/rest/v1/testimonials`,
      {
        params,
        headers: this.headers,
      }
    );
  }
}
