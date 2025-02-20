import { createAction, props } from '@ngrx/store';
import { BlogRecipe } from './_interfaces';

const SharedActionTypes = {
  LoadBlog: '[Shared] Load Blog',
  LoadBlogSuccess: '[Shared] Load Blog Success',
  LoadBlogFailure: '[Shared] Load Blog Failure',
  EmailSignup: '[Shared] Email Signup',
  EmailSignupSuccess: '[Shared] Email Signup Success',
  EmailSignupFailure: '[Shared] Email Signup Failure',
};

export const loadBlog = createAction(
  SharedActionTypes.LoadBlog,
  props<{ number: number }>()
);
export const loadBlogSuccess = createAction(
  SharedActionTypes.LoadBlogSuccess,
  props<{ data: BlogRecipe }>()
);
export const loadBlogFailure = createAction(
  SharedActionTypes.LoadBlogFailure,
  props<{ error: string }>()
);

export const emailSignup = createAction(
  SharedActionTypes.EmailSignup,
  props<{ email: string }>()
);
export const emailSignupSuccess = createAction(
  SharedActionTypes.EmailSignupSuccess,
  props<{ isAdded: boolean }>()
);
export const emailSignupFailure = createAction(
  SharedActionTypes.EmailSignupFailure,
  props<{ error: string }>()
);
