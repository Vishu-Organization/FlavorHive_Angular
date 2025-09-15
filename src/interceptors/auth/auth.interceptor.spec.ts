import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';
import { authInterceptor } from './auth.interceptor';
import { of } from 'rxjs';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('authInterceptor (TestBed)', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let storeSpy: jasmine.SpyObj<Store<any>>;

  beforeEach(() => {
    storeSpy = jasmine.createSpyObj('Store', ['select']);
    TestBed.configureTestingModule({
      providers: [
        { provide: Store, useValue: storeSpy },
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(), // <-- This sets up the testing backend
      ],
    });
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add Authorization header if accessToken exists and url does not include "edamam"', () => {
    storeSpy.select.and.returnValue(of('test-token'));
    http.get('/api/data').subscribe();
    const req = httpMock.expectOne('/api/data');
    expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
    req.flush({});
  });

  it('should not add Authorization header if accessToken does not exist', () => {
    storeSpy.select.and.returnValue(of(null));
    http.get('/api/data').subscribe();
    const req = httpMock.expectOne('/api/data');
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush({});
  });

  it('should not add Authorization header if url includes "edamam"', () => {
    storeSpy.select.and.returnValue(of('test-token'));
    http.get('/api/edamam/data').subscribe();
    const req = httpMock.expectOne('/api/edamam/data');
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush({});
  });
});
