import { createAction, props } from '@ngrx/store';

export const setTitle = createAction(
  '[Dummy] Set Title',
  props<{ title: string }>()
);
