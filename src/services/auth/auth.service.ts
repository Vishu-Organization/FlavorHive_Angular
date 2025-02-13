import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const VITE_SUPABASE_URL = 'https://opmliiavikfniknrvlgt.supabase.co';
const SUPABASE_API_AUTH = `${VITE_SUPABASE_URL}/auth/v1`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  refreshToken(refreshToken: string): Observable<any> {
    return this.http.post(
      `${SUPABASE_API_AUTH}/token?grant_type=refresh_token`,
      { refresh_token: refreshToken }
    );
  }

  signIn(email: string, password: string): Observable<any> {
    return this.http.post(`${SUPABASE_API_AUTH}/token?grant_type=password`, {
      email,
      password,
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
}
