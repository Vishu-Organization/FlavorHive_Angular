import { createActionGroup, props } from '@ngrx/store';
import { BlogRecipe } from './_interfaces';

export const BlogActions = createActionGroup({
  source: 'Blog',
  events: {
    Load: props<{ number: number }>(),
    'Load Success': props<{ data: Readonly<BlogRecipe> }>(),
    'Load Failure': props<{ error: string }>(),
  },
});

export const EmailSignupActions = createActionGroup({
  source: 'Email Signup',
  events: {
    Signup: props<{ email: string }>(),
    'Signup Success': props<{ isAdded: boolean }>(),
    'Signup Failure': props<{ error: string }>(),
  },
});
