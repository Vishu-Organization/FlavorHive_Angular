import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthService, SUPABASE_API_AUTH } from './auth.service';
import { VITE_SUPABASE_URL } from 'src/store/types/urls';
import { IAuthResponse } from 'src/app/types/token';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const mockAuthResponse: IAuthResponse = {
    access_token: 'token123',
    expires_in: 3600,
    expires_at: Date.now() + 3600 * 1000,
    refresh_token: 'refresh123',
    user: {
      id: '1',
      user_metadata: {
        email: 'test@example.com',
        name: 'Vishu',
      },
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
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

      service.refreshToken(token).subscribe((res) => {
        expect(res).toEqual(mockAuthResponse);
      });

      const req = httpMock.expectOne(
        (request) =>
          request.url === `${SUPABASE_API_AUTH}/token` &&
          request.params.get('grant_type') === 'refresh_token'
      );
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ refresh_token: token });
      req.flush(mockAuthResponse);
    });
  });

  describe('signIn', () => {
    it('should post email and password', () => {
      const email = 'test@example.com';
      const password = '123456';

      service.signIn(email, password).subscribe((res) => {
        expect(res.access_token).toBe(mockAuthResponse.access_token);
      });

      const req = httpMock.expectOne(
        (request) =>
          request.url === `${SUPABASE_API_AUTH}/token` &&
          request.params.get('grant_type') === 'password'
      );
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ email, password });
      req.flush(mockAuthResponse);
    });
  });

  describe('signup', () => {
    it('should post signup data', () => {
      const email = 'new@example.com';
      const password = '123456';
      const name = 'Vishu';

      service.signup(email, password, name).subscribe((res) => {
        expect(res.user.user_metadata.name).toEqual(name);
      });

      const req = httpMock.expectOne(`${SUPABASE_API_AUTH}/signup`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({
        email,
        password,
        options: { data: { name } },
      });
      req.flush(mockAuthResponse);
    });
  });

  describe('signInWithGoogle', () => {
    it('should call authorize endpoint', () => {
      const redirectUrl = `${SUPABASE_API_AUTH}/authorize?provider=google&redirect_to=${window.location.origin}`;

      service.signInWithGoogle().subscribe((res) => {
        expect(res.url).toBe('http://redirect.url');
      });

      const req = httpMock.expectOne(redirectUrl);
      expect(req.request.method).toBe('GET');
      req.flush({ url: 'http://redirect.url' });
    });
  });

  describe('logOut', () => {
    it('should call logout endpoint', () => {
      service.logOut().subscribe((res) => {
        expect(res).toBeNull();
      });

      const req = httpMock.expectOne(`${SUPABASE_API_AUTH}/logout`);
      expect(req.request.method).toBe('POST');
      req.flush(null);
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
