import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HomeState } from './reducer';

export const selectHomeState = createFeatureSelector<HomeState>('home');

export const selectMealsShipped = createSelector(
  selectHomeState,
  (state) => state.mealsShipped
);
export const selectMealsShippedData = createSelector(
  selectMealsShipped,
  (state) => state.data
);
export const selectMealsShippedLoading = createSelector(
  selectMealsShipped,
  (state) => state.loading
);
export const selectMealsShippedError = createSelector(
  selectMealsShipped,
  (state) => state.error
);

export const selectTestimonials = createSelector(
  selectHomeState,
  (state) => state.testimonials
);
export const selectTestimonialsData = createSelector(
  selectTestimonials,
  (state) => state.data
);
export const selectTestimonialsLoading = createSelector(
  selectTestimonials,
  (state) => state.loading
);
export const selectTestimonialsError = createSelector(
  selectTestimonials,
  (state) => state.error
);

export const selectHomeRecipes = createSelector(
  selectHomeState,
  (state) => state.recipes
);
export const selectHomeRecipesData = createSelector(
  selectHomeRecipes,
  (state) => state.data
);
export const selectHomeRecipesLoading = createSelector(
  selectHomeRecipes,
  (state) => state.loading
);
export const selectHomeRecipesError = createSelector(
  selectHomeRecipes,
  (state) => state.error
);
