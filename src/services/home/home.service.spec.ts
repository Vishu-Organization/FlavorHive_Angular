import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { HomeService } from './home.service';
import { VITE_SUPABASE_URL } from 'src/store/types/urls';
import {
  DummyHomeRecipeResponse,
  DummyRecipe,
  MealsShipped,
  SelectorMap,
} from 'src/store/home/_interfaces';
import { provideHttpClient } from '@angular/common/http';

describe('HomeService', () => {
  let service: HomeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HomeService,
        provideHttpClient(), // provide the real HttpClient
        provideHttpClientTesting(), // provide the testing backend
        provideMockStore(),
      ],
    });

    service = TestBed.inject(HomeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('Initialization', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should expose store selectors as observables', () => {
      expect(service.mealsShippedData$).toBeDefined();
      expect(service.testimonialsData$).toBeDefined();
      expect(service.homeReciepesData$).toBeDefined();
    });
  });

  describe('HTTP calls', () => {
    it('should fetch MealsShipped data', () => {
      const mockData: MealsShipped[] = [
        { id: 1, name: 'Meal', image: 'img.jpg' } as any,
      ];

      service.getMealsShippedData().subscribe((data) => {
        expect(data).toEqual(mockData);
      });

      const req = httpMock.expectOne(
        (request) =>
          request.url === `${VITE_SUPABASE_URL}/rest/v1/meals_shipped` &&
          request.params.get('select') ===
            'id,image,name,description_primary, description_secondary, alt' &&
          request.params.get('order') === 'id.asc'
      );

      expect(req.request.method).toBe('GET');
      req.flush(mockData);
    });

    it('should fetch Testimonials data', () => {
      const mockResponse = [
        { id: 1, name: 'John Doe', description: 'Great service!' },
      ];

      service.getTestimonials().subscribe((data) => {
        expect(data).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(
        (r) =>
          r.url.includes('/testimonials') &&
          r.params.get('select') === 'id,name,description' &&
          r.params.get('order') === 'id.asc'
      );

      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should fetch HomeRecipe from dummyjson', () => {
      const mockResponse: DummyHomeRecipeResponse = {
        recipes: [{ id: 1, name: 'Pizza' } as DummyRecipe],
      } as DummyHomeRecipeResponse;

      service
        .getHomeRecipe('https://dummyjson.com/recipes/tag/vegetarian')
        .subscribe((recipe) => {
          expect(recipe).toEqual(mockResponse.recipes[0]);
        });

      const req = httpMock.expectOne(
        'https://dummyjson.com/recipes/tag/vegetarian'
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('Async logic', () => {
    it('should fetch all categories in getHomeMenuRecipes', async () => {
      const mockRecipe = {
        recipe: { id: 1, name: 'Mock Recipe', image: 'mock.png' },
      };

      const promise = service.getHomeMenuRecipes();

      const expectedUrls = [
        'https://dummyjson.com/recipes/tag/greek',
        'https://dummyjson.com/recipes/tag/mediterranean',
        'https://dummyjson.com/recipes/tag/salad',
        'https://dummyjson.com/recipes/tag/indian',
        'https://dummyjson.com/recipes/tag/mexican',
        'https://dummyjson.com/recipes/tag/pasta',
        'https://dummyjson.com/recipes/meal-type/breakfast',
        'https://dummyjson.com/recipes/meal-type/snack',
        'https://dummyjson.com/recipes/meal-type/lunch',
        'https://dummyjson.com/recipes/meal-type/dessert',
      ];

      expectedUrls.forEach((url) => {
        const req = httpMock.expectOne(url);
        expect(req.request.method).toBe('GET');
        req.flush({ recipes: [mockRecipe] });
      });

      const result = await promise;
      expect(Object.keys(result).length).toBe(10);
    });
  });

  describe('Helper methods', () => {
    it('should build URL correctly with selectors', () => {
      const selectorMap: SelectorMap = {
        fields: ['label', 'image'],
        health: ['vegan', 'gluten-free'],
      };

      const url = service.buildUrl(selectorMap);
      expect(url).toContain('type=public');
      expect(url).toContain('&field=label');
      expect(url).toContain('&field=image');
      expect(url).toContain('&health=vegan');
      expect(url).toContain('&health=gluten-free');
    });

    it('should append fields correctly', () => {
      const result = (service as any).appendFields(['label', 'calories']);
      expect(result).toBe('&field=label&field=calories');
    });

    it('should return base URL with appId and random appKey', () => {
      const result = (service as any).getBaseUrl();
      expect(result).toContain(service.appId);
      expect(service.appKeys.some((key) => result.includes(key))).toBeTrue();
    });
  });
});
