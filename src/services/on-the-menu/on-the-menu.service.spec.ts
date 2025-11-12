import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { OnTheMenuService } from './on-the-menu.service';
import { SelectorMap } from 'src/store/home/_interfaces';
import { RecipesResponse } from 'src/store/on-the-menu/_types';

describe('OnTheMenuService', () => {
  let service: OnTheMenuService;
  let httpMock: HttpTestingController;
  const baseUrl = 'https://api.edamam.com/api/recipes/v2';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OnTheMenuService,
        provideHttpClient(withFetch()),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(OnTheMenuService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  // ───────────────────────────────
  describe('Service Creation', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  // ───────────────────────────────
  describe('loadOnTheMenuRecipes()', () => {
    it('should call the API with correct base URL and query params', () => {
      const selectorMap: SelectorMap = { q: 'pasta' } as any;
      let response: RecipesResponse | undefined;

      service
        .loadOnTheMenuRecipes(selectorMap)
        .subscribe((res) => (response = res));

       const req = httpMock.expectOne(
         (r) => r.url === baseUrl && r.params.get('q') === 'pasta'
       );

      expect(req.request.method).toBe('GET');
      expect(req.request.params.get('type')).toBe('public');
      expect(req.request.params.get('app_id')).toBeTruthy();
      expect(req.request.params.get('app_key')).toBeTruthy();

      const mockResponse: RecipesResponse = { hits: [], _links: {} } as any;
      req.flush(mockResponse);

      expect(response).toEqual(mockResponse);
    });

    it('should randomize app_key each time', () => {
      const selectorMap = { q: 'rice' } as unknown as SelectorMap;
      const mockResponse: RecipesResponse = {} as RecipesResponse;

      service.loadOnTheMenuRecipes(selectorMap).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(
        (r) => r.url === 'https://api.edamam.com/api/recipes/v2'
      );

      expect(req.request.method).toBe('GET');
      expect(req.request.params.get('type')).toBe('public');
      expect(req.request.params.get('app_id')).toBe('7f563e49');

      const key = req.request.params.get('app_key');
      expect([
        '4be7f47dd4dc6fd6ed0b7644e352f6aa',
        '7bbf70c600c349da70d8d807a2949f29',
      ]).toContain(key as string);

      req.flush(mockResponse);
    });
  });

  // ───────────────────────────────
  describe('loadMoreOnTheMenuRecipes()', () => {
    it('should call the next-page URL directly', () => {
      const nextUrl = `${baseUrl}?page=2`;
      let response: RecipesResponse | undefined;

      service
        .loadMoreOnTheMenuRecipes(nextUrl)
        .subscribe((res) => (response = res));

      const req = httpMock.expectOne(nextUrl);
      expect(req.request.method).toBe('GET');

      const mockResponse: RecipesResponse = { hits: [], _links: {} } as any;
      req.flush(mockResponse);

      expect(response).toEqual(mockResponse);
    });

    it('should propagate HTTP errors', () => {
      const nextUrl = `${baseUrl}?page=2`;
      let errorResponse: any;

      service.loadMoreOnTheMenuRecipes(nextUrl).subscribe({
        error: (err) => (errorResponse = err),
      });

      const req = httpMock.expectOne(nextUrl);
      req.flush('Error', { status: 500, statusText: 'Server Error' });

      expect(errorResponse.status).toBe(500);
      expect(errorResponse.statusText).toBe('Server Error');
    });
  });
});
