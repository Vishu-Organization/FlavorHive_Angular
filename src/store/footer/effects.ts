import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FooterActions } from './actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { FooterService } from 'src/services/footer/footer.service';
import { AuthActions } from '../auth/actions';

@Injectable({
  providedIn: 'root',
})
export class FooterEffects {
  constructor(
    private actions$: Actions,
    private footerService: FooterService
  ) {}

  loadFooterLinks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        FooterActions.load,
        AuthActions.loginSuccess,
        AuthActions.logoutSuccess,
        AuthActions.signupSuccess
      ),
      mergeMap(() =>
        this.footerService.getFooterLinks().pipe(
          map((data) => FooterActions.loadSuccess({ data })),
          catchError(({ error }) => of(FooterActions.loadFailure({ error })))
        )
      )
    )
  );
}
