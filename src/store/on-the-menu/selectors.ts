import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OnTheMenuFilterState } from './_types';

export const selectOnTheMenuFilterState =
  createFeatureSelector<OnTheMenuFilterState>('onTheMenuFilter');

export const selectFilterData = createSelector(
  selectOnTheMenuFilterState,
  ({ data }) => data
);

export const selectFilterLoading = createSelector(
  selectOnTheMenuFilterState,
  ({ loading }) => loading
);

export const selectFilterError = createSelector(
  selectOnTheMenuFilterState,
  ({ error }) => error
);
