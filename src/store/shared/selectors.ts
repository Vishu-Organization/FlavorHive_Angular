import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SharedState } from './_interfaces';

const selectSharedState =
  createFeatureSelector<Readonly<SharedState>>('shared');

const selectBlogState = createSelector(selectSharedState, ({ blog }) => blog);
const selectEmailSignupState = createSelector(
  selectSharedState,
  ({ emailSignup }) => emailSignup
);

export const selectBlog = createSelector(selectBlogState, ({ data }) => data);
export const selectBlogLoading = createSelector(
  selectBlogState,
  ({ loading }) => loading
);
export const selectBlogError = createSelector(
  selectBlogState,
  ({ error }) => error
);

export const selectIsEmailAdded = createSelector(
  selectEmailSignupState,
  ({ data }) => data
);
