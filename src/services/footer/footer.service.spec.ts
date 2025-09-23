import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { FooterService } from './footer.service';
import { Store } from '@ngrx/store';
import { VITE_SUPABASE_URL } from 'src/store/types/urls';
import { FooterLink } from 'src/store/footer/_interfaces';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('FooterService', () => {
  let service: FooterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [
        {
            provide: Store,
            useValue: jasmine.createSpyObj('Store', ['select', 'dispatch']),
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
    ]
});
    service = TestBed.inject(FooterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getFooterLink', () => {
    it('should call the correct endpoint and return footer links', () => {
      const mockLinks: FooterLink[] = [
        { id: 1, name: 'Link 1', type: 1, to: 'link1' } as FooterLink,
      ];

      service.getFooterLink('legal').subscribe((res) => {
        expect(res).toEqual(
          jasmine.arrayContaining([
            jasmine.objectContaining({ id: 1, name: 'Link 1' }),
          ])
        );
      });

      const req = httpMock.expectOne(
        `${VITE_SUPABASE_URL}/rest/v1/legal?order=id.asc`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockLinks);
    });
  });

  describe('getFooterLinks', () => {
    it('should fetch multiple footer link groups with titles', () => {
      const mockResponse: FooterLink[] = [
        { id: 1, name: 'Product A', type: 1, to: 'a' } as FooterLink,
      ];

      service.getFooterLinks().subscribe((res) => {
        expect(res.length).toBeGreaterThan(0);
        expect(res[0]).toEqual(
          jasmine.objectContaining({
            links: jasmine.arrayContaining([
              jasmine.objectContaining({ name: 'Product A' }),
            ]),
          })
        );
      });

      // Expect requests for all endpoints
      const endpoints = [
        'product_links',
        'team',
        'heroes',
        'customer_support',
        'legal',
      ];
      endpoints.forEach((endpoint) => {
        const req = httpMock.expectOne(
          `${VITE_SUPABASE_URL}/rest/v1/${endpoint}?order=id.asc`
        );
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
      });
    });
  });

  describe('getTitleFromEndpoint', () => {
    it('should map endpoint names to titles', () => {
      expect((service as any).getTitleFromEndpoint('legal')).toBe(
        '&copy; Blue Apron, LLC 202'
      );
      expect((service as any).getTitleFromEndpoint('customer_support')).toBe(
        'Customer Support'
      );
      expect((service as any).getTitleFromEndpoint('unknown')).toBe('');
    });
  });
});
