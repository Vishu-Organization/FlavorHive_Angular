import { createReducer, on } from '@ngrx/store';
import { setTitle } from '../actions/dummy.actions';

export interface DummyState {
  app: { title: string };
}

export const initialState = {
  title: 'FlavorHive',
};

export const dummyReducer = createReducer(
  initialState,
  on(setTitle, (state, { title }) => ({ ...state, title }))
);
