import { TestBed } from '@angular/core/testing';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PageService } from './page.service';
import { VisionRouteData } from 'src/store/page/_types';
import { VITE_SUPABASE_URL } from 'src/store/types/urls';

describe('PageService', () => {
  let service: PageService;
  let httpMock: HttpTestingController;

  const mockVisionData: VisionRouteData[] = [
    {
      url: 'https://www.youtube.com/watch?v=C_Xgn87CF-I',
      how_food_grown: 'Food is grown sustainably',
      quality_description: 'High quality ingredients',
    } as VisionRouteData,
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PageService,
        provideHttpClient(withInterceptorsFromDi()), // ✅ base HttpClient
        provideHttpClientTesting(), // ✅ testing utilities
      ],
    });

    service = TestBed.inject(PageService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getVisionPageData', () => {
    it('should make GET request with correct headers and params and return first item', () => {
      service.getVisionPageData().subscribe((result) => {
        expect(result).toEqual(mockVisionData[0]);
      });

      const req = httpMock.expectOne(
        `${VITE_SUPABASE_URL}/rest/v1/video?order=id.asc`
      );

      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Accept-Profile')).toBe('our_vision');
      expect(req.request.headers.get('Content-Profile')).toBe('our_vision');

      req.flush(mockVisionData);
    });

    it('should handle empty array gracefully', () => {
      service.getVisionPageData().subscribe((result) => {
        expect(result).toBeUndefined();
      });

      const req = httpMock.expectOne(
        `${VITE_SUPABASE_URL}/rest/v1/video?order=id.asc`
      );
      req.flush([]);
    });

    it('should propagate HTTP error', () => {
      const mockError = { status: 500, statusText: 'Server Error' };

      service.getVisionPageData().subscribe({
        next: () => fail('should have failed with 500 error'),
        error: (error) => {
          expect(error.status).toBe(500);
        },
      });

      const req = httpMock.expectOne(
        `${VITE_SUPABASE_URL}/rest/v1/video?order=id.asc`
      );
      req.flush(null, mockError);
    });
  });
});
