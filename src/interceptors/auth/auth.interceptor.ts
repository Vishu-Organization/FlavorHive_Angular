import { inject } from '@angular/core';
import {
  HttpRequest,
  HttpInterceptorFn,
  HttpHandlerFn,
} from '@angular/common/http';
import { first, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAccessToken } from 'src/store/auth/selectors';
import { AuthState } from 'src/store/auth/_interfaces';

export const authInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const store = inject<Store<AuthState>>(Store);
  return store.select(selectAccessToken).pipe(
    first(),
    switchMap((accessToken) => {
      const headers: { [key: string]: string } = {};
      if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
      }

      let clonedRequest;

      if (!request.url.includes('edamam')) {
        clonedRequest = request.clone({ setHeaders: headers });
      } else {
        clonedRequest = request.clone({});
      }

      return next(clonedRequest);
    })
  );
};
