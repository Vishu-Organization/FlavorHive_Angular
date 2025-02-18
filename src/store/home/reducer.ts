import { createReducer, on } from '@ngrx/store';
import { MealsShippedState } from './_interfaces';
import { loadMealsShipped, loadMealsShippedFailure, loadMealsShippedSuccess } from './actions';

export interface HomeState {
  mealsShipped: MealsShippedState;
}

const initialState: HomeState = {
  mealsShipped: { loading: false, error: null, data: [] },
};

export const homeReducer = createReducer(
  initialState,
  on(loadMealsShipped, (state) => ({
    ...state,
    mealsShipped: {
      ...state.mealsShipped,
      loading: true,
    },
  })),
  on(loadMealsShippedSuccess, (state, { data }) => ({
    ...state,
    mealsShipped: {
      loading: false,
      error: null,
      data: data,
    },
  })),
  on(loadMealsShippedFailure, (state, {error}) => ({
    ...state,
    mealsShipped: {
      ...state.mealsShipped,
      loading: false,
      error
    }
  }))
);
