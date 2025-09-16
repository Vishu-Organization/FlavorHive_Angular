import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { forkJoin, map, Observable } from 'rxjs';
import {
  FooterLink,
  FooterLinkItem,
  FooterState,
} from 'src/store/footer/_interfaces';
import {
  selectFooterLinksData,
  selectFooterLinksError,
  selectFooterLinksLoading,
} from 'src/store/footer/selectors';
import { VITE_SUPABASE_URL } from 'src/store/types/urls';

@Injectable({
  providedIn: 'root',
})
export class FooterService {
  footerLinks$: Observable<FooterLinkItem[] | null>;
  footerLinksLoading$: Observable<boolean>;
  footerLinksError$: Observable<string | null>;

  headers = new HttpHeaders({
    'Accept-Profile': 'footer_navigation',
    'Content-Profile': 'footer_navigation',
  });

  private http = inject(HttpClient);
  private store = inject(Store<FooterState>);

  constructor() {
    this.footerLinks$ = this.store.select(selectFooterLinksData);
    this.footerLinksLoading$ = this.store.select(selectFooterLinksLoading);
    this.footerLinksError$ = this.store.select(selectFooterLinksError);
  }

  getFooterLinks(): Observable<FooterLinkItem[]> {
    const endpoints = [
      'product_links',
      'team',
      'heroes',
      'customer_support',
      'legal',
    ];

    return forkJoin(
      endpoints.map((endpoint) =>
        this.getFooterLink(endpoint).pipe(
          map((links) => ({
            links,
            title: this.getTitleFromEndpoint(endpoint),
            id: Date.now(), // Generate a unique ID for each section
          }))
        )
      )
    );
  }

  // Map endpoint names to titles
  private getTitleFromEndpoint(endpoint: string): string {
    const titles: Record<string, string> = {
      legal: '&copy; Blue Apron, LLC 202',
      customer_support: 'Customer Support',
    };
    return titles[endpoint] || '';
  }

  getFooterLink(url: string): Observable<FooterLink[]> {
    const params = new HttpParams().set('order', 'id.asc');
    return this.http.get<FooterLink[]>(`${VITE_SUPABASE_URL}/rest/v1/${url}`, {
      headers: this.headers,
      params,
    });
  }
}
