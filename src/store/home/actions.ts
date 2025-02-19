import { createAction, props } from '@ngrx/store';
import { HomeMenu, MealsShipped, Testimonial } from './_interfaces';

export const HomeActionTypes = {
  LoadMealsShipped: '[Home] Meals Shipped Load',
  LoadMealsShippedSuccess: '[Home] Meals Shipped Load Success',
  LoadMealsShippedFailure: '[Home] Meals Shipped Load Failure',
  LoadTestimonials: '[Home] Testimonials Load',
  LoadTestimonialsSuccess: '[Home] Testimonials Load Success',
  LoadTestimonialsFailure: '[Home] Testimonials Load Failure',
  LoadHomeMenuRecipes: '[Home] Menu Recipes Load',
  LoadHomeMenuRecipesSuccess: '[Home] Menu Recipes Load Success',
  LoadHomeMenuRecipesFailure: '[Home] Menu Recipes Load Failure',
};

export const loadMealsShipped = createAction(HomeActionTypes.LoadMealsShipped);
export const loadMealsShippedSuccess = createAction(
  HomeActionTypes.LoadMealsShippedSuccess,
  props<{ data: MealsShipped[] }>()
);
export const loadMealsShippedFailure = createAction(
  HomeActionTypes.LoadMealsShippedFailure,
  props<{ error: string }>()
);

export const loadTestimonials = createAction(HomeActionTypes.LoadTestimonials);
export const loadTestimonialsSuccess = createAction(
  HomeActionTypes.LoadTestimonialsSuccess,
  props<{ data: Testimonial[] }>()
);
export const loadTestimonialsFailure = createAction(
  HomeActionTypes.LoadTestimonialsFailure,
  props<{ error: string }>()
);

export const loadHomeMenuRecipes = createAction(
  HomeActionTypes.LoadHomeMenuRecipes
);
export const loadHomeMenuRecipesSuccess = createAction(
  HomeActionTypes.LoadHomeMenuRecipesSuccess,
  props<{ data: HomeMenu }>()
);
export const loadHomeMenuRecipesFailure = createAction(
  HomeActionTypes.LoadHomeMenuRecipesFailure,
  props<{ error: string }>()
);
