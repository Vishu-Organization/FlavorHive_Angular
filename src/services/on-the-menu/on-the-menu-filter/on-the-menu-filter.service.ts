import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import {
  Filter,
  MenuHeaderFilters,
  OnTheMenuFilterOption,
} from 'src/store/on-the-menu/_types';
import { VITE_SUPABASE_URL } from 'src/store/types/urls';

@Injectable({
  providedIn: 'root',
})
export class OnTheMenuFilterService {
  private http = inject(HttpClient);
  headers = new HttpHeaders({
    'Accept-Profile': 'recipe_filter',
    'Content-Profile': 'recipe_filter',
  });

  params = new HttpParams().set('order', 'value');

  getMenuHeaderFilters(): Observable<MenuHeaderFilters> {
    return forkJoin({
      [OnTheMenuFilterOption.cuisineType]: this.getCuisineTypes(),
      [OnTheMenuFilterOption.dietType]: this.getDietTypes(),
      [OnTheMenuFilterOption.dishType]: this.getDishTypes(),
      [OnTheMenuFilterOption.health]: this.getHealthLabels(),
      [OnTheMenuFilterOption.mealType]: this.getMealTypes(),
      [OnTheMenuFilterOption.ingr]: of([]),
    });
  }

  private fetchFilters(table: string, select: string): Observable<Filter[]>{
    const params = this.params.set('select', select);
    return this.http.get<Filter[]>(
      `${VITE_SUPABASE_URL}/rest/v1/${table}`,
      {
        headers: this.headers,
        params: params,
      }
    );
  }

  private getCuisineTypes(): Observable<Filter[]> {
    return this.fetchFilters('cuisine_type', 'id, value');
  }
  
  private getDietTypes(): Observable<Filter[]> {
    return this.fetchFilters('diet_labels', 'id, value, description');
  }
  
  private getDishTypes(): Observable<Filter[]> {
    return this.fetchFilters('dish_type', 'id, value, label');
  }
  
  private getHealthLabels(): Observable<Filter[]> {
    return this.fetchFilters('health_labels', 'id, value, label, description');
  }
  
  private getMealTypes(): Observable<Filter[]> {
    return this.fetchFilters('meal_type', 'id, value, label');
  }
}
