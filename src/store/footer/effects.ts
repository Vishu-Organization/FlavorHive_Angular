import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadFooterLinks,
  loadFooterLinksFailure,
  loadFooterLinksSuccess,
} from './actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { FooterService } from 'src/services/footer/footer.service';
import { loginSuccess, logoutSuccess, signupSuccess } from '../auth/actions';

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
      ofType(loadFooterLinks, loginSuccess, logoutSuccess, signupSuccess),
      mergeMap(() =>
        this.footerService.getFooterLinks().pipe(
          map((data) => loadFooterLinksSuccess({ data })),
          catchError(({ error }) => of(loadFooterLinksFailure({ error })))
        )
      )
    )
  );
}
