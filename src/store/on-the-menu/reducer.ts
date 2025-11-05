import { createReducer, on } from '@ngrx/store';
import { initialOnTheMenuFilterState } from './_types';
import { OnTheMenuFilterActions } from './actions';

export const onTheMenuFilterReducer = createReducer(
  initialOnTheMenuFilterState,

  on(OnTheMenuFilterActions.load, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(OnTheMenuFilterActions.loadSuccess, (state, { data }) => ({
    ...state,
    data,
    loading: false,
    error: null,
  })),
  on(OnTheMenuFilterActions.loadFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
