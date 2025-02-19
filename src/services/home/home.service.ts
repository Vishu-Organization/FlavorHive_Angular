import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  catchError,
  combineLatest,
  concatMap,
  delay,
  forkJoin,
  from,
  map,
  Observable,
  of,
  toArray,
} from 'rxjs';
import {
  HomeMenu,
  HomeMenuSelector,
  MealsShipped,
  Recipe,
  RecipeHit,
  RecipeResponse,
  SelectorMap,
  Testimonial,
} from 'src/store/home/_interfaces';
import { HomeState } from 'src/store/home/reducer';
import {
  selectHomeRecipesData,
  selectHomeRecipesError,
  selectHomeRecipesLoading,
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

  homeReciepesData$: Observable<HomeMenu | null>;
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

  constructor(private http: HttpClient, private store: Store<HomeState>) {
    this.mealsShippedData$ = this.store.select(selectMealsShippedData);
    this.mealsShippedLoading$ = this.store.select(selectMealsShippedLoading);
    this.mealsShippedError$ = this.store.select(selectMealsShippedError);

    this.testimonialsData$ = this.store.select(selectTestimonialsData);
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

  getHomeMenuRecipes(): Observable<HomeMenu> {
    const fields = ['label', 'image', 'images'];
    return combineLatest([
      this.getHomeRecipe(
        this.buildUrl({ fields, cuisineType: ['mediterranean'] })
      ),
      this.getHomeRecipe(this.buildUrl({ fields, mealType: ['breakfast'] })),
      this.getHomeRecipe(this.buildUrl({ fields, health: ['vegetarian'] })),
      this.getHomeRecipe(this.buildUrl({ fields, cuisineType: ['french'] })),
      this.getHomeRecipe(this.buildUrl({ fields, cuisineType: ['indian'] })),
      this.getHomeRecipe(this.buildUrl({ fields, dishType: ['starter'] })),
      this.getHomeRecipe(this.buildUrl({ fields, mealType: ['snack'] })),
      this.getHomeRecipe(this.buildUrl({ fields, cuisineType: ['mexican'] })),
      this.getHomeRecipe(this.buildUrl({ fields, dishType: ['pancake'] })),
      this.getHomeRecipe(this.buildUrl({ fields, dishType: ['salad'] })),
    ]).pipe(
      map(
        ([
          mediterranean,
          breakFast,
          vegetarian,
          french,
          indian,
          starter,
          snack,
          mexican,
          pancake,
          salad,
        ]) => ({
          mediterranean: {
            recipe: mediterranean,
            selector: HomeMenuSelector.cuisine,
          },
          breakFast: {
            recipe: breakFast,
            selector: HomeMenuSelector.meal,
          },
          vegetarian: {
            recipe: vegetarian,
            selector: HomeMenuSelector.health,
          },
          french: {
            recipe: french,
            selector: HomeMenuSelector.cuisine,
          },
          indian: {
            recipe: indian,
            selector: HomeMenuSelector.cuisine,
          },
          starter: {
            recipe: starter,
            selector: HomeMenuSelector.dish,
          },
          snack: {
            recipe: snack,
            selector: HomeMenuSelector.meal,
          },
          mexican: {
            recipe: mexican,
            selector: HomeMenuSelector.cuisine,
          },
          pancake: {
            recipe: pancake,
            selector: HomeMenuSelector.dish,
          },
          salad: {
            recipe: salad,
            selector: HomeMenuSelector.dish,
          },
        })
      )
    );
  }

  getHomeRecipe(url: string): Observable<Recipe> {
    return this.http.get<RecipeResponse>(url).pipe(
      map((response) => this.getHits(response)),
      map(([{ recipe }]) => recipe)
    );
  }

  private getHits(response: any): RecipeHit[] {
    return response?.hits;
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
