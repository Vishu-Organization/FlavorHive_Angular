import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  HomeMenuActions,
  MealsShippedActions,
  TestimonialsActions,
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
      ofType(MealsShippedActions.load),
      mergeMap(() => {
        return this.homeService.getMealsShippedData().pipe(
          map((data) => MealsShippedActions.loadSuccess({ data })),
          catchError(({ error: { msg } }) =>
            of(MealsShippedActions.loadFailure({ error: msg }))
          )
        );
      })
    )
  );

  loadTestimonials$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TestimonialsActions.load),
      mergeMap(() =>
        this.homeService.getTestimonials().pipe(
          map((data) => TestimonialsActions.loadSuccess({ data })),
          catchError(({ error: { msg } }) =>
            of(TestimonialsActions.loadFailure({ error: msg }))
          )
        )
      )
    )
  );

  loadHomeMenuRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomeMenuActions.load),
      mergeMap(() =>
        this.homeService.getHomeMenuRecipes().pipe(
          map((data) => HomeMenuActions.loadSuccess({ data })),
          catchError(({ error: { message }, ok, status }) => {
            if (status === 401) {
              message =
                'You are not authorized to view the recipes. Please contact the support team!';
            }
            return of(HomeMenuActions.loadFailure({ error: message }));
          })
        )
      )
    )
  );
}
