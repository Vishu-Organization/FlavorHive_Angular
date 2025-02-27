import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { first, Observable, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAccessToken } from 'src/store/auth/selectors';
import { AuthState } from 'src/store/auth/_interfaces';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store<AuthState>) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    return this.store.select(selectAccessToken).pipe(
      first(),
      switchMap((accessToken) => {
        const headers: {[key: string]: string} = {  }
        if (accessToken) {
          headers['Authorization'] = `Bearer ${accessToken}`
        }

        let clonedRequest;

        if (!request.url.includes('edamam')) {
          clonedRequest = request.clone({ setHeaders: headers });
        } else {
          clonedRequest = request.clone({});
        }

        return next.handle(clonedRequest);

       }
    )
  )
  }
}
