import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { OnTheMenuFilterService } from './on-the-menu-filter.service';
import { Filter, MenuHeaderFilters } from 'src/store/on-the-menu/_types';
import { provideHttpClient } from '@angular/common/http';

describe('OnTheMenuFilterService', () => {
  let service: OnTheMenuFilterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OnTheMenuFilterService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(OnTheMenuFilterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // ---------------------------------------------------------------
  describe('fetchFilters()', () => {
    it('should call correct URL with headers and params', () => {
      const mockData: Filter[] = [{ id: 1, value: 'Italian' } as Filter];
      const table = 'cuisine_type';
      const select = 'id, value';

      service['fetchFilters'](table, select).subscribe((data) => {
        expect(data).toEqual(mockData);
      });

      // ✅ Match by predicate instead of exact string
      const req = httpMock.expectOne((req) =>
        req.url.includes(`/rest/v1/${table}`)
      );

      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Accept-Profile')).toBe('recipe_filter');
      expect(req.request.params.get('select')).toBe(select);
      expect(req.request.params.get('order')).toBe('value');

      req.flush(mockData);
      httpMock.verify();
    });
  });

  // ---------------------------------------------------------------
  describe('Individual filter getters', () => {
    it('should call correct URL for cuisine types', () => {
      service['getCuisineTypes']().subscribe();
      const req = httpMock.expectOne((r) =>
        r.url.includes('/rest/v1/cuisine_type')
      );
      expect(req.request.params.get('select')).toBe('id, value');
      expect(req.request.params.get('order')).toBe('value');
      req.flush([]);
    });

    it('should call correct URL for diet types', () => {
      service['getDietTypes']().subscribe();
      const req = httpMock.expectOne((r) =>
        r.url.includes('/rest/v1/diet_labels')
      );
      expect(req.request.params.get('select')).toBe('id, value, description');
      expect(req.request.params.get('order')).toBe('value');
      req.flush([]);
    });

    it('should call correct URL for dish types', () => {
      service['getDishTypes']().subscribe();
      const req = httpMock.expectOne((r) =>
        r.url.includes('/rest/v1/dish_type')
      );
      expect(req.request.params.get('select')).toBe('id, value, label');
      expect(req.request.params.get('order')).toBe('value');
      req.flush([]);
    });

    it('should call correct URL for health labels', () => {
      service['getHealthLabels']().subscribe();
      const req = httpMock.expectOne((r) =>
        r.url.includes('/rest/v1/health_labels')
      );
      expect(req.request.params.get('select')).toBe(
        'id, value, label, description'
      );
      expect(req.request.params.get('order')).toBe('value');
      req.flush([]);
    });

    it('should call correct URL for meal types', () => {
      service['getMealTypes']().subscribe();
      const req = httpMock.expectOne((r) =>
        r.url.includes('/rest/v1/meal_type')
      );
      expect(req.request.params.get('select')).toBe('id, value, label');
      expect(req.request.params.get('order')).toBe('value');
      req.flush([]);
    });
  });

  // ---------------------------------------------------------------
  describe('getMenuHeaderFilters()', () => {
    it('should forkJoin all requests correctly', () => {
      const mockResponse: Record<string, { id: number; value: string }[]> = {
        cuisine: [{ id: 1, value: 'Indian' }],
        diet: [{ id: 2, value: 'Vegan' }],
        dish: [{ id: 3, value: 'Main' }],
        health: [{ id: 4, value: 'Low-Fat' }],
        meal: [{ id: 5, value: 'Dinner' }],
        ingredients: [],
      };

      service.getMenuHeaderFilters().subscribe((result) => {
        expect(result).toEqual(mockResponse as unknown as MenuHeaderFilters);
      });

      // Each table endpoint expected
      const urls = [
        'cuisine_type',
        'diet_labels',
        'dish_type',
        'health_labels',
        'meal_type',
      ];

      urls.forEach((table, index) => {
        const req = httpMock.expectOne((req) =>
          req.url.includes(`/rest/v1/${table}`)
        );
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse[Object.keys(mockResponse)[index]]);
      });

      // Ensure no unmatched requests left
      httpMock.verify();
    });
  });
});
