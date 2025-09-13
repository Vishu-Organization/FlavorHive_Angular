import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { SharedService } from './shared.service';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { VITE_SUPABASE_URL } from 'src/store/types/urls';
import { BlogActions } from 'src/store/shared/actions';

describe('SharedService', () => {
  let service: SharedService;
  let httpMock: HttpTestingController;
  let storeSpy: jasmine.SpyObj<Store<any>>;

  beforeEach(() => {
    storeSpy = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    storeSpy.select.and.returnValue(of(null));

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: Store, useValue: storeSpy }],
    });

    service = TestBed.inject(SharedService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getFoodBlogs', () => {
    it('should fetch a single food blog', () => {
      const mockResponse = {
        recipes: [
          { id: 1, title: 'Recipe 1', image: 'img1.jpg', sourceUrl: 'url1' },
        ],
      };

      service.getFoodBlogs(1).subscribe((res) => {
        expect(res).toEqual(mockResponse.recipes[0]);
      });

      const req = httpMock.expectOne(
        (request) =>
          request.url === service.SPOONACULAR_BASE_URL &&
          request.params.get('number') === '1'
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should fetch multiple food blogs', () => {
      const mockResponse = {
        recipes: [
          { id: 1, title: 'Recipe 1', image: 'img1.jpg', sourceUrl: 'url1' },
          { id: 2, title: 'Recipe 2', image: 'img2.jpg', sourceUrl: 'url2' },
        ],
      };

      service.getFoodBlogs(2).subscribe((res) => {
        expect(res).toEqual(mockResponse.recipes);
      });

      const req = httpMock.expectOne(
        (request) =>
          request.url === service.SPOONACULAR_BASE_URL &&
          request.params.get('number') === '2'
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should default to 10 food blogs when no number is provided', () => {
      const mockResponse = {
        recipes: Array.from({ length: 10 }, (_, i) => ({
          id: i + 1,
          title: `Recipe ${i + 1}`,
          image: `img${i + 1}.jpg`,
          sourceUrl: `url${i + 1}`,
        })),
      };

      service.getFoodBlogs().subscribe((res) => {
        expect(res).toEqual(mockResponse.recipes);
      });

      const req = httpMock.expectOne(
        (request) =>
          request.url === service.SPOONACULAR_BASE_URL &&
          request.params.get('number') === '10'
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('onEmailSignUp', () => {
    it('should post email for signup', () => {
      const testEmail = 'test@example.com';

      service.onEmailSignUp(testEmail).subscribe((res) => {
        expect(res).toBeNull(); // Supabase returns empty body → null
      });

      const req = httpMock.expectOne(
        `${VITE_SUPABASE_URL}/rest/v1/subscribers`
      );
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ email: testEmail });
      req.flush(null);
    });
  });
});
