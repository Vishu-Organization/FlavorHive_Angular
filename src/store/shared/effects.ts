import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SharedService } from 'src/services/shared/shared.service';
import { BlogActions, EmailSignupActions } from './actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { BlogRecipe } from './_interfaces';
import { ToastService } from 'src/services/toast/toast.service';

@Injectable({ providedIn: 'root' })
export class SharedEffects {
  loadBlog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.load),
      mergeMap(({ number }) =>
        this.sharedService.getFoodBlogs(number).pipe(
          map((data) => BlogActions.loadSuccess({ data: data as BlogRecipe })),
          catchError((error) => of(BlogActions.loadFailure({ error })))
        )
      )
    )
  );

  emailSignup = createEffect(() =>
    this.actions$.pipe(
      ofType(EmailSignupActions.signup),
      mergeMap(({ email }) =>
        this.sharedService.onEmailSignUp(email).pipe(
          map(() => {
            this.toastService.show(
              'Successfully added the email to subscribers list'
            );
            return EmailSignupActions.signupSuccess({ isAdded: !!email });
          }),
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
            return of(EmailSignupActions.signupFailure({ error }));
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
