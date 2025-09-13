import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService, SUPABASE_API_AUTH } from './auth.service';
import { VITE_SUPABASE_URL } from 'src/store/types/urls';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('refreshToken', () => {
    it('should post refresh token', () => {
      const token = 'refresh123';
      const mockResponse = { access_token: 'newToken' };

      service.refreshToken(token).subscribe((res) => {
        expect(res).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(
        (request) =>
          request.url === `${SUPABASE_API_AUTH}/token` &&
          request.params.get('grant_type') === 'refresh_token'
      );
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ refresh_token: token });
      req.flush(mockResponse);
    });
  });

  describe('signIn', () => {
    it('should post email and password', () => {
      const email = 'test@example.com';
      const password = '123456';
      const mockResponse = { access_token: 'token' };

      service.signIn(email, password).subscribe((res) => {
        expect(res).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(
        (request) =>
          request.url === `${SUPABASE_API_AUTH}/token` &&
          request.params.get('grant_type') === 'password'
      );
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ email, password });
      req.flush(mockResponse);
    });
  });

  describe('signup', () => {
    it('should post signup data', () => {
      const email = 'new@example.com';
      const password = '123456';
      const name = 'Vishu';
      service.signup(email, password, name).subscribe((res) => {
        expect(res).toEqual({ id: 1 });
      });

      const req = httpMock.expectOne(`${VITE_SUPABASE_URL}/auth/v1/signup`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({
        email,
        password,
        options: { data: { name } },
      });
      req.flush({ id: 1 });
    });
  });

  describe('signInWithGoogle', () => {
    it('should call authorize endpoint', () => {
      service.signInWithGoogle().subscribe((res) => {
        expect(res.url).toBe('http://redirect.url');
      });

      const req = httpMock.expectOne(
        `${VITE_SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${window.location.origin}`
      );
      expect(req.request.method).toBe('GET');
      req.flush({ url: 'http://redirect.url' });
    });
  });

  describe('logOut', () => {
    it('should call logout endpoint', () => {
      service.logOut().subscribe((res) => {
        expect(res).toEqual({ success: true });
      });

      const req = httpMock.expectOne(`${VITE_SUPABASE_URL}/auth/v1/logout`);
      expect(req.request.method).toBe('POST');
      req.flush({ success: true });
    });
  });

  describe('loadHowItWorks', () => {
    it('should load how_it_works data', () => {
      const mockData = [{ id: 1, name: 'Step 1', description: 'Desc' }];

      service.loadHowItWorks().subscribe((res) => {
        expect(res).toEqual(mockData);
      });

      const req = httpMock.expectOne(
        (request) =>
          request.url === `${VITE_SUPABASE_URL}/rest/v1/how_it_works` &&
          request.params.get('select') === 'id,name,description' &&
          request.params.get('order') === 'id.asc'
      );

      expect(req.request.method).toBe('GET');
      req.flush(mockData);
    });
  });

  describe('loadAdditionalInfo', () => {
    it('should load additional_info data', () => {
      const mockData = [{ id: 1, name: 'Info 1', description: 'Desc' }];

      service.loadAdditionalInfo().subscribe((res) => {
        expect(res).toEqual(mockData);
      });

      const req = httpMock.expectOne(
        (request) =>
          request.url === `${VITE_SUPABASE_URL}/rest/v1/additional_info` &&
          request.params.get('select') === 'id,name,description' &&
          request.params.get('order') === 'id.asc'
      );

      expect(req.request.method).toBe('GET');
      req.flush(mockData);
    });
  });
});
