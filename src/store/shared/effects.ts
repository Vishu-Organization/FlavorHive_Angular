import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SharedService } from 'src/services/shared/shared.service';
import {
  emailSignup,
  emailSignupFailure,
  emailSignupSuccess,
  loadBlog,
  loadBlogFailure,
  loadBlogSuccess,
} from './actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { BlogRecipe } from './_interfaces';
import { ToastService } from 'src/services/toast/toast.service';

@Injectable({ providedIn: 'root' })
export class SharedEffects {
  loadBlog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBlog),
      mergeMap(({ number }) =>
        this.sharedService.getFoodBlogs(number).pipe(
          map((data) => loadBlogSuccess({ data: data as BlogRecipe })),
          catchError((error) => of(loadBlogFailure({ error })))
        )
      )
    )
  );

  emailSignup = createEffect(() =>
    this.actions$.pipe(
      ofType(emailSignup),
      mergeMap(({ email }) =>
        this.sharedService.onEmailSignUp(email).pipe(
          map(() => emailSignupSuccess({ isAdded: !!email })),
          catchError(({ status }) => {
            let error = '';
            if (status === 409) {
              error = 'Email already exists';
            }
            this.toastService.show(
              error ||
                'An error occurred while signing up, please try again later!!',
              'error'
            );
            return of(emailSignupFailure({ error }));
          })
        )
      )
    )
  );

  constructor(
    private sharedService: SharedService,
    private actions$: Actions,
    private toastService: ToastService
  ) {}
}
