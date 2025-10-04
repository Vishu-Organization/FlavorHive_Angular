import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  HomeMenuActions,
  MealsShippedActions,
  TestimonialsActions,
} from './actions';
import { catchError, from, map, mergeMap, of } from 'rxjs';
import { HomeService } from 'src/services/home/home.service';
import { inject, Injectable } from '@angular/core';
import { HomeRecipe } from './_interfaces';

@Injectable({
  providedIn: 'root',
})
export class HomeEffects {
  private actions$ = inject(Actions);
  private homeService = inject(HomeService);

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
        from(this.homeService.getHomeMenuRecipes()).pipe(
          // 👈 wrap Promise in Observable
          map((data: HomeRecipe) => HomeMenuActions.loadSuccess({ data })),
          catchError(({ error: { message }, status }) => {
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
