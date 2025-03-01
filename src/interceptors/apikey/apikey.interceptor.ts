import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';

const VITE_SUPABASE_KEY = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wbWxpaWF2aWtmbmlrbnJ2bGd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc3NDMzNTIsImV4cCI6MjAzMzMxOTM1Mn0.mG2HJBsvHNkWs4cxOrNSEzYSld_ZHE4SdH3g05EZj8I`;

export const apikeyInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const headers: { [key: string]: string } = { apikey: VITE_SUPABASE_KEY };

  let clonedRequest;

  if (request.url.includes('supabase')) {
    clonedRequest = request.clone({ setHeaders: headers });
  } else {
    clonedRequest = request.clone({});
  }

  return next(clonedRequest);
};
