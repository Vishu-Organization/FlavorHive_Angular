import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISignupDataItem } from 'src/store/auth/_interfaces';
import { VITE_SUPABASE_URL } from 'src/store/types/urls';

export const SUPABASE_API_AUTH = `${VITE_SUPABASE_URL}/auth/v1`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  refreshToken(refreshToken: string): Observable<any> {
    const params = new HttpParams().set('grant_type', 'refresh_token');
    return this.http.post(
      `${SUPABASE_API_AUTH}/token`,
      { refresh_token: refreshToken },
      { params }
    );
  }

  signIn(email: string, password: string): Observable<any> {
    const params = new HttpParams().set('grant_type', 'password');
    return this.http.post(
      `${SUPABASE_API_AUTH}/token`,
      { email, password },
      { params }
    );
  }

  signup(email: string, password: string, name: string): Observable<any> {
    return this.http.post(`${SUPABASE_API_AUTH}/signup`, {
      email,
      password,
      options: { data: { name } },
    });
  }

  signInWithGoogle(): Observable<{ url: string }> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<{ url: string }>(
      `${SUPABASE_API_AUTH}/authorize?provider=google&redirect_to=${window.location.origin}`,
      { headers }
    );
  }

  logOut(): Observable<any> {
    return this.http.post(`${SUPABASE_API_AUTH}/logout`, {});
  }

  loadHowItWorks(): Observable<ISignupDataItem[]> {
    const headers = new HttpHeaders({
      'Accept-Profile': 'sign_up',
      'Content-Profile': 'sign_up',
    });
    const params = new HttpParams()
      .set('select', 'id,name,description')
      .set('order', 'id.asc');

    return this.http.get<ISignupDataItem[]>(
      `${VITE_SUPABASE_URL}/rest/v1/how_it_works`,
      { params, headers }
    );
  }

  loadAdditionalInfo(): Observable<ISignupDataItem[]> {
    const headers = new HttpHeaders({
      'Accept-Profile': 'sign_up',
      'Content-Profile': 'sign_up',
    });
    const params = new HttpParams()
      .set('select', 'id,name,description')
      .set('order', 'id.asc');

    return this.http.get<ISignupDataItem[]>(
      `${VITE_SUPABASE_URL}/rest/v1/additional_info`,
      { params, headers }
    );
  }
}
