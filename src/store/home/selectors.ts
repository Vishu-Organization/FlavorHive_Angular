import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HomeState } from './reducer';
import { mealsShippedAdapter, testimonialsAdapter } from './_interfaces';

export const selectHomeState = createFeatureSelector<HomeState>('home');

export const selectMealsShippedState = createSelector(
  selectHomeState,
  ({ mealsShipped }) => mealsShipped
);

// Get Built-in Entity Selectors for Meals Shipped
export const {
  selectAll: selectAllMealsShipped,
  selectEntities: selectMealsShippedEntities,
  selectIds: selectMealsShippedIds,
  selectTotal: selectMealsShippedTotal,
} = mealsShippedAdapter.getSelectors(selectMealsShippedState);

export const selectMealsShippedLoading = createSelector(
  selectMealsShippedState,
  ({ loading }) => loading
);
export const selectMealsShippedError = createSelector(
  selectMealsShippedState,
  ({ error }) => error
);
export const selectTestimonialsState = createSelector(
  selectHomeState,
  ({ testimonials }) => testimonials
);

// Get Built-in Entity Selectors for Testimonials
export const {
  selectAll: selectAllTestimonials,
  selectEntities: selectTestimonialEntities,
  selectIds: selectTestimonialIds,
  selectTotal: selectTestimonialTotal,
} = testimonialsAdapter.getSelectors(selectTestimonialsState);

export const selectTestimonialsLoading = createSelector(
  selectTestimonialsState,
  ({ loading }) => loading
);
export const selectTestimonialsError = createSelector(
  selectTestimonialsState,
  ({ error }) => error
);

export const selectHomeRecipes = createSelector(
  selectHomeState,
  ({ recipes }) => recipes
);
export const selectHomeRecipesData = createSelector(
  selectHomeRecipes,
  ({ data }) => data
);
export const selectHomeRecipesLoading = createSelector(
  selectHomeRecipes,
  ({ loading }) => loading
);
export const selectHomeRecipesError = createSelector(
  selectHomeRecipes,
  ({ error }) => error
);
