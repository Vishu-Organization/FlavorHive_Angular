import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadMealsShipped,
  loadMealsShippedFailure,
  loadMealsShippedSuccess,
  loadTestimonials,
  loadTestimonialsSuccess,
} from './actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { HomeService } from 'src/services/home/home.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeEffects {
  constructor(private actions$: Actions, private homeService: HomeService) {}

  loadMealsShipped$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMealsShipped),
      mergeMap(() => {
        return this.homeService.getMealsShippedData().pipe(
          map((data) => loadMealsShippedSuccess({ data })),
          catchError(({ error: { msg } }) =>
            of(loadMealsShippedFailure({ error: msg }))
          )
        );
      })
    )
  );

  loadTestimonials$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTestimonials),
      mergeMap(() =>
        this.homeService.getTestimonials().pipe(
          map((data) => loadTestimonialsSuccess({ data })),
          catchError(({ error: { msg } }) =>
            of(loadMealsShippedFailure({ error: msg }))
          )
        )
      )
    )
  );
}
