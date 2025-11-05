import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { lastValueFrom, map, Observable } from 'rxjs';
import {
  DummyHomeRecipeResponse,
  DummyRecipe,
  HomeRecipe,
  MealsShipped,
  SelectorMap,
  Testimonial,
} from 'src/store/home/_interfaces';
import { HomeState } from 'src/store/home/reducer';
import {
  selectHomeRecipesData,
  selectHomeRecipesError,
  selectHomeRecipesLoading,
  selectMealsShippedError,
  selectMealsShippedLoading,
  selectTestimonialsError,
  selectTestimonialsLoading,
  selectAllMealsShipped,
  selectAllTestimonials,
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

  homeReciepesData$: Observable<HomeRecipe | null>;
  homeReciepesLoading$: Observable<boolean>;
  homeReciepesError$: Observable<string | null>;

  appId = '7f563e49';
  appKeys = [
    '4be7f47dd4dc6fd6ed0b7644e352f6aa',
    '7bbf70c600c349da70d8d807a2949f29',
  ];

  headers = new HttpHeaders({
    'Accept-Profile': 'home',
    'Content-Profile': 'home',
  });

  private homeMenuUrl = `https://dummyjson.com/recipes`;

  private http = inject(HttpClient);
  private store = inject(Store<HomeState>);

  constructor() {
    this.mealsShippedData$ = this.store.select(selectAllMealsShipped);
    this.mealsShippedLoading$ = this.store.select(selectMealsShippedLoading);
    this.mealsShippedError$ = this.store.select(selectMealsShippedError);

    this.testimonialsData$ = this.store.select(selectAllTestimonials);
    this.testimonialsLoading$ = this.store.select(selectTestimonialsLoading);
    this.testimonialsError$ = this.store.select(selectTestimonialsError);

    this.homeReciepesData$ = this.store.select(selectHomeRecipesData);
    this.homeReciepesLoading$ = this.store.select(selectHomeRecipesLoading);
    this.homeReciepesError$ = this.store.select(selectHomeRecipesError);
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

  async getHomeMenuRecipes(): Promise<HomeRecipe> {
    const categories: Record<keyof HomeRecipe, string> = {
      greek: 'tag/greek',
      mediterranean: 'tag/mediterranean',
      salad: 'tag/salad',
      indian: 'tag/indian',
      mexican: 'tag/mexican',
      pasta: 'tag/pasta',
      breakfast: 'meal-type/breakfast',
      snack: 'meal-type/snack',
      lunch: 'meal-type/lunch',
      dessert: 'meal-type/dessert',
    };

    const entries = await Promise.all(
      Object.entries(categories).map(async ([key, path]) => {
        const recipe = await lastValueFrom(
          this.getHomeRecipe(`${this.homeMenuUrl}/${path}`)
        );
        return [key, recipe] as const;
      })
    );

    // Artificial delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return Object.fromEntries(entries) as HomeRecipe;
  }

  getHomeRecipe(url: string): Observable<DummyRecipe> {
    return this.http.get<DummyHomeRecipeResponse>(url).pipe(
      map(({ recipes }) => recipes),
      map(([recipe]) => recipe)
    );
  }

  buildUrl(selectorMap: SelectorMap): string {
    const selectors = Object.entries(selectorMap)
      .filter(([key]) => key !== 'fields')
      .map(([key, value]) =>
        value
          .map((v) => `&${key}=${encodeURIComponent(v).replace(' ', '%20')}`)
          .join('')
      )
      .join('');

    return `${this.getBaseUrl()}${this.appendFields(
      selectorMap.fields
    )}${selectors}`;
  }

  private getBaseUrl(): string {
    return `https://api.edamam.com/api/recipes/v2?type=public&app_id=${
      this.appId
    }&app_key=${this.appKeys[Math.floor(Math.random() * this.appKeys.length)]}`;
  }

  private appendFields(fields: string[]): string {
    const urlPart = fields.map((field) => {
      return `&field=${field}`;
    });
    return urlPart.join('');
  }
}
