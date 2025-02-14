import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from 'src/services/auth/auth.service';
import {
  initialize,
  loadSignupData,
  loadSignupDataFailure,
  loadSignupDataSuccess,
  login,
  loginFailure,
  loginSuccess,
  logout,
  logoutFailure,
  logoutSuccess,
} from './actions';
import {
  catchError,
  filter,
  forkJoin,
  map,
  mergeMap,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { AuthState } from './reducer';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { TypedAction } from '@ngrx/store/src/models';
import { ToastService } from 'src/services/toast/toast.service';
import { ILoginResponse } from 'src/app/types/token';

@Injectable({
  providedIn: 'root',
})
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AuthState>,
    private cookieService: CookieService,
    private router: Router,
    private toastService: ToastService
  ) {}

  emitLoginSuccess({
    access_token,
    expires_at,
    expires_in,
    refresh_token,
    user: {
      user_metadata: { email, name },
      id,
    },
  }: ILoginResponse): TypedAction<any> {
    return loginSuccess({
      token: {
        token: access_token,
        expiresAt: expires_at,
        expiresIn: expires_in,
        refreshToken: refresh_token,
        user: { email, name, id },
      },
    });
  }

  refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initialize),
      filter(() => this.cookieService.check('REF_TOKEN')),
      switchMap(() => {
        const refreshToken = this.cookieService.get('REF_TOKEN');
        return this.authService
          .refreshToken(refreshToken)
          .pipe(map(this.emitLoginSuccess));
      }),
      catchError(({ message }) => of(loginFailure({ error: message })))
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap(({ email, password }) =>
        this.authService.signIn(email, password).pipe(
          map((data) => {
            this.toastService.show('Login successful!', 'success');
            return this.emitLoginSuccess(data);
          }),
          catchError(({ error: { msg } }) => {
            this.toastService.show(msg, 'error');
            return of(loginFailure({ error: msg }));
          })
        )
      )
    )
  );

  setAuthCookie$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap((action) => {
          if (this.cookieService.check('REF_TOKEN')) {
            this.cookieService.delete('REF_TOKEN');
          }
          this.cookieService.set('REF_TOKEN', action.token.refreshToken!);
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      switchMap(() =>
        this.authService.logOut().pipe(
          map(() => logoutSuccess()),
          tap(() => this.cookieService.delete('REF_TOKEN')),
          catchError((error) => {
            console.log(error);
            return of(logoutFailure(error.error.message));
          })
        )
      )
    )
  );

  loadSignUpData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSignupData),
      switchMap(() =>
        forkJoin([
          this.authService.loadHowItWorks(),
          this.authService.loadAdditionalInfo(),
        ]).pipe(
          map(([howItWorks, additionalInfo]) =>
            loadSignupDataSuccess({ howItWorks, additionalInfo })
          ),
          catchError((error) => {
            console.log(error);
            return of(loadSignupDataFailure({ error: error.msg }));
          })
        )
      )
    )
  );
}
