import { createAction, props } from '@ngrx/store';
import { MealsShipped } from './_interfaces';

export const HomeActionTypes = {
  LoadMealsShipped: '[Home] Meals Shipped Load',
  LoadMealsShippedSuccess: '[Home] Meals Shipped Load Success',
  LoadMealsShippedFailure: '[Home] Meals Shipped Load Failure',
};

export const loadMealsShipped = createAction(HomeActionTypes.LoadMealsShipped);
export const loadMealsShippedSuccess = createAction(
  HomeActionTypes.LoadMealsShippedSuccess,
  props<{data:MealsShipped[]}>()
);
export const loadMealsShippedFailure = createAction(
  HomeActionTypes.LoadMealsShippedFailure, props<{error: string}>()
);
