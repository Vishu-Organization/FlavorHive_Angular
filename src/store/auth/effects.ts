import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from 'src/services/auth/auth.service';
import { AuthActions, AuthDataActions, initialize } from './actions';
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

  emitAuthSuccess(
    {
      access_token,
      expires_at,
      expires_in,
      refresh_token,
      user: {
        user_metadata: { email, name },
        id,
      },
    }: ILoginResponse,
    action?: any
  ): TypedAction<any> {
    return action({
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
          .pipe(
            map((data) => this.emitAuthSuccess(data, AuthActions.loginSuccess))
          );
      }),
      catchError(({ message }) =>
        of(AuthActions.loginFailure({ error: message }))
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ email, password }) =>
        this.authService.signIn(email, password).pipe(
          map((data) => {
            this.toastService.show('Login successful!', 'success');
            return this.emitAuthSuccess(data, AuthActions.loginSuccess);
          }),
          catchError(({ error: { msg } }) => {
            this.toastService.show(msg, 'error');
            return of(AuthActions.loginFailure({ error: msg }));
          })
        )
      )
    )
  );

  setAuthCookie$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess, AuthActions.signupSuccess),
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
      ofType(AuthActions.logout),
      switchMap(() =>
        this.authService.logOut().pipe(
          map(() => AuthActions.logoutSuccess()),
          tap(() => this.cookieService.delete('REF_TOKEN')),
          catchError((error) => {
            console.log(error);
            return of(AuthActions.loginFailure(error.error.message));
          })
        )
      )
    )
  );

  loadSignUpData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthDataActions.load),
      switchMap(() =>
        forkJoin([
          this.authService.loadHowItWorks(),
          this.authService.loadAdditionalInfo(),
        ]).pipe(
          map(([howItWorks, additionalInfo]) =>
            AuthDataActions.loadSuccess({ howItWorks, additionalInfo })
          ),
          catchError((error) => {
            console.log(error);
            return of(AuthDataActions.loadFailure({ error: error.msg }));
          })
        )
      )
    )
  );

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signup),
      switchMap(({ email, password, name }) =>
        this.authService.signup(email, password, name).pipe(
          map((data) => {
            this.toastService.show('Signup successful!', 'success');
            return this.emitAuthSuccess(data, AuthActions.signupSuccess);
          }),
          catchError(({ error: { msg } }) => {
            this.toastService.show(msg, 'error');
            return of(AuthActions.signupFailure({ error: msg }));
          })
        )
      )
    )
  );
}
