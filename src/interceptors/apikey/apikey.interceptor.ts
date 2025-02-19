import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

const VITE_SUPABASE_KEY = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wbWxpaWF2aWtmbmlrbnJ2bGd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc3NDMzNTIsImV4cCI6MjAzMzMxOTM1Mn0.mG2HJBsvHNkWs4cxOrNSEzYSld_ZHE4SdH3g05EZj8I`;

@Injectable()
export class ApikeyInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const headers: { [key: string]: string } = { apikey: VITE_SUPABASE_KEY };

     let clonedRequest;

     if (!request.url.includes('edamam')) {
       clonedRequest = request.clone({ setHeaders: headers });
     } else {
       clonedRequest = request.clone({});
     }

     return next.handle(request.clone(clonedRequest));
  }
}
