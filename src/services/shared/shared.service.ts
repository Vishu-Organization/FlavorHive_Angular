import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import {
  BlogRecipe,
  BlogResponse,
  SharedState,
} from 'src/store/shared/_interfaces';
import {
  selectBlog,
  selectBlogError,
  selectBlogLoading,
  selectIsEmailAdded,
} from 'src/store/shared/selectors';
import { VITE_SUPABASE_URL } from 'src/store/types/urls';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  SPOONACULAR_API_KEY = '0ad73f1850d44208bf7af88a748ec9fd';
  SPOONACULAR_BASE_URL = 'https://api.spoonacular.com/recipes/random';

  blog$: Observable<BlogRecipe | null>;
  blogLoading$: Observable<boolean>;
  blogError$: Observable<string | null>;
  isEmailAdded$: Observable<boolean | null>;

  constructor(private http: HttpClient, private store: Store<SharedState>) {
    this.blog$ = this.store.select(selectBlog);
    this.blogLoading$ = this.store.select(selectBlogLoading);
    this.blogError$ = this.store.select(selectBlogError);
    this.isEmailAdded$ = this.store.select(selectIsEmailAdded);
  }

  getFoodBlogs(number = 10): Observable<BlogRecipe | BlogRecipe[]> {
    const params = new HttpParams()
      .set('number', number)
      .set('apiKey', this.SPOONACULAR_API_KEY);

    return this.http
      .get<BlogResponse>(this.SPOONACULAR_BASE_URL, {
        params,
      })
      .pipe(map(({ recipes }) => (number === 1 ? recipes[0] : recipes)));
  }

  onEmailSignUp(email: string): Observable<void> {
    const headers = new HttpHeaders({
      'Accept-Profile': 'news_letter',
      'Content-Profile': 'news_letter',
    });

    return this.http.post<void>(
      `${VITE_SUPABASE_URL}/rest/v1/subscribers`,
      { email },
      { headers }
    );
  }
}
