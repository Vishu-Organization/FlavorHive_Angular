import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { LoggerService } from './logger.service';
import { ErrorPayload, LogResponse } from 'src/app/types/logger';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('LoggerService', () => {
  let service: LoggerService;
  let httpMock: HttpTestingController;

  const apiUrl = 'https://h6ry02cevb.execute-api.ap-south-1.amazonaws.com/dev';

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [LoggerService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});

    service = TestBed.inject(LoggerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('Service initialization', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('logError()', () => {
    it('should call POST /logs with payload and return response', () => {
      const payload: ErrorPayload = {
        message: 'Test error',
        stack: 'stack-trace',
      } as ErrorPayload;

      const mockResponse: LogResponse = {
        success: true
      };

      service.logError(payload).subscribe((res) => {
        expect(res).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${apiUrl}/logs`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(payload);

      req.flush(mockResponse);
    });

    it('should handle error when API call fails', () => {
      const payload: ErrorPayload = {
        message: 'Failure case',
        stack: 'stack-trace'
      } as ErrorPayload;

      const mockError = { status: 500, statusText: 'Server Error' };

      service.logError(payload).subscribe({
        next: () => fail('Expected an error, but got success response'),
        error: (error) => {
          expect(error.status).toBe(500);
          expect(error.statusText).toBe('Server Error');
        },
      });

      const req = httpMock.expectOne(`${apiUrl}/logs`);
      expect(req.request.method).toBe('POST');
      req.flush({}, mockError);
    });

    it('should handle empty or invalid payload gracefully', () => {
      const invalidPayload = {} as ErrorPayload; // missing required fields

      service.logError(invalidPayload).subscribe({
        next: () => fail('Expected error, got success'),
        error: (error) => {
          expect(error.status).toBe(400); // backend should validate
        },
      });

      const req = httpMock.expectOne(`${apiUrl}/logs`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(invalidPayload);

      req.flush(
        { message: 'Invalid payload' },
        { status: 400, statusText: 'Bad Request' }
      );
    });
  });
});
