import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HomeService } from './home.service';
import { Store } from '@ngrx/store';
import { VITE_SUPABASE_URL } from 'src/store/types/urls';
import { of } from 'rxjs';
import { MealsShipped, Recipe } from 'src/store/home/_interfaces';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('HomeService', () => {
  let service: HomeService;
  let httpMock: HttpTestingController;
  let storeSpy: jasmine.SpyObj<Store<any>>;

  beforeEach(() => {
    storeSpy = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    storeSpy.select.and.returnValue(of(null));

    TestBed.configureTestingModule({
    imports: [],
    providers: [{ provide: Store, useValue: storeSpy }, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});

    service = TestBed.inject(HomeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getMealsShippedData', () => {
    it('should call the API with correct params', () => {
      const mockResponse = [
        { id: 1, name: 'Meal', image: 'img.jpg' } as MealsShipped,
      ];

      service.getMealsShippedData().subscribe((res) => {
        expect(res).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(
        (r) =>
          r.url === `${VITE_SUPABASE_URL}/rest/v1/meals_shipped` &&
          r.params.get('order') === 'id.asc'
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('getTestimonials', () => {
    it('should call the API with correct params', () => {
      const mockResponse = [{ id: 1, name: 'John', description: 'Nice!' }];

      service.getTestimonials().subscribe((res) => {
        expect(res).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(
        (r) =>
          r.url === `${VITE_SUPABASE_URL}/rest/v1/testimonials` &&
          r.params.get('order') === 'id.asc'
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('getHomeRecipe', () => {
    it('should map API response to a recipe', () => {
      const mockRecipe = { label: 'Test Recipe' } as Recipe;
      const mockResponse = { hits: [{ recipe: mockRecipe }] };

      service.getHomeRecipe('https://test.url').subscribe((recipe) => {
        expect(recipe).toEqual(mockRecipe);
      });

      const req = httpMock.expectOne('https://test.url');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('buildUrl', () => {
    it('should build url with fields and selectors', () => {
      const url = service.buildUrl({
        fields: ['label', 'image'],
        cuisineType: ['indian', 'french'],
      });

      expect(url).toContain('&field=label');
      expect(url).toContain('&field=image');
      expect(url).toContain('&cuisineType=indian');
      expect(url).toContain('&cuisineType=french');
    });

    it('should build url with only fields', () => {
      const url = service.buildUrl({
        fields: ['label'],
      });
      expect(url).toContain('&field=label');
    });
  });

  describe('getBaseUrl', () => {
    it('should return base url containing app_id and app_key', () => {
      const url = (service as any).getBaseUrl(); // private
      expect(url).toContain(service.appId);
      expect(url).toContain('&app_key=');
    });
  });

  describe('appendFields', () => {
    it('should append multiple fields correctly', () => {
      const urlPart = (service as any).appendFields(['label', 'image']);
      expect(urlPart).toBe('&field=label&field=image');
    });
  });
});
