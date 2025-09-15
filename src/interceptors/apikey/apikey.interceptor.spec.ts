import { apikeyInterceptor } from './apikey.interceptor';
import { HttpRequest } from '@angular/common/http';
import { of } from 'rxjs';

const VITE_SUPABASE_KEY = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wbWxpaWF2aWtmbmlrbnJ2bGd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc3NDMzNTIsImV4cCI6MjAzMzMxOTM1Mn0.mG2HJBsvHNkWs4cxOrNSEzYSld_ZHE4SdH3g05EZj8I`;

describe('apikeyInterceptor', () => {
  let next: jasmine.Spy;

  beforeEach(() => {
    next = jasmine.createSpy('next').and.callFake((req) => of(req));
  });

  it('should add apikey header if url includes "supabase"', (done) => {
    const req = new HttpRequest('GET', '/api/supabase/data');

    apikeyInterceptor(req, next).subscribe((resultReq) => {
      const httpReq = resultReq as unknown as HttpRequest<any>;
      expect(httpReq.headers.get('apikey')).toBe(VITE_SUPABASE_KEY);
      expect(next).toHaveBeenCalled();
      done();
    });
  });

  it('should not add apikey header if url does not include "supabase"', (done) => {
    const req = new HttpRequest('GET', '/api/other/data');

    apikeyInterceptor(req, next).subscribe((resultReq) => {
      const httpReq = resultReq as unknown as HttpRequest<any>;
      expect(httpReq.headers.has('apikey')).toBe(false);
      expect(next).toHaveBeenCalled();
      done();
    });
  });
});
