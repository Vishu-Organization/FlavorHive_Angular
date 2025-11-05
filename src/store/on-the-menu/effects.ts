import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OnTheMenuFilterService } from 'src/services/on-the-menu/on-the-menu-filter/on-the-menu-filter.service';
import { OnTheMenuFilterActions } from './actions';
import { catchError, filter, map, mergeMap, of, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectFilterData } from './selectors';

@Injectable({
  providedIn: 'root',
})
export class OnTheMenuEffects {
  private actions$ = inject(Actions);
  private onTheMenuFilterService = inject(OnTheMenuFilterService);
  private store = inject(Store);

  loadFilters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OnTheMenuFilterActions.load),
      withLatestFrom(this.store.select(selectFilterData)),
      filter(([, data]) => !data),    // Second element is our data. If already present, don't make api call as the data doesn't change
      mergeMap(() =>
        this.onTheMenuFilterService.getMenuHeaderFilters().pipe(
          map((data) => OnTheMenuFilterActions.loadSuccess({ data })),
          catchError((errorResponse) => {
            const msg = errorResponse?.error?.msg || 'Unknown error';
            return of(OnTheMenuFilterActions.loadFailure({ error: msg }));
          })
        )
      )
    )
  );
}
