import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable } from 'rxjs';
import { FooterLink, FooterLinkItem, FooterState } from 'src/store/footer/_interfaces';
import { selectFooterLinksData, selectFooterLinksError, selectFooterLinksLoading } from 'src/store/footer/selectors';
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

  constructor(private http: HttpClient, private store: Store<FooterState>) {
    this.footerLinks$ = this.store.select(selectFooterLinksData);
    this.footerLinksLoading$ = this.store.select(selectFooterLinksLoading);
    this.footerLinksError$ = this.store.select(selectFooterLinksError);
  }

  getFooterLinks(): Observable<FooterLinkItem[]> {
    return combineLatest([
      this.getFooterLink('product_links'),
      this.getFooterLink('legal'),
      this.getFooterLink('customer_support'),
      this.getFooterLink('heroes'),
      this.getFooterLink('team'),
    ]).pipe(
      map(([products_links, legal, customer_support, heroes, team]) => {
        return [
          {
            links: products_links,
            title: '',
          },
          {
            links: team,
            title: '',
          },
          {
            links: heroes,
            title: '',
          },
          {
            links: customer_support,
            title: 'Customer Support',
          },
          {
            links: legal,
            title: '&copy; Blue Apron, LLC 202',
          },
        ];
      })
    );
  }

  getFooterLink(url: string): Observable<FooterLink[]> {
    const params = new HttpParams().set('order', 'id.asc');
    return this.http.get<FooterLink[]>(`${VITE_SUPABASE_URL}/rest/v1/${url}`, {
      headers: this.headers,
      params,
    });
  }
}
