import { createReducer, on } from '@ngrx/store';
import {
  HomeMenu,
  HomeRecipesState,
  MealsShippedState,
  TestimonialState,
} from './_interfaces';
import {
  loadHomeMenuRecipes,
  loadHomeMenuRecipesFailure,
  loadHomeMenuRecipesSuccess,
  loadMealsShipped,
  loadMealsShippedFailure,
  loadMealsShippedSuccess,
  loadTestimonials,
  loadTestimonialsFailure,
  loadTestimonialsSuccess,
} from './actions';

export interface HomeState {
  mealsShipped: MealsShippedState;
  testimonials: TestimonialState;
  recipes: HomeRecipesState;
}

const initialState: HomeState = {
  mealsShipped: { loading: false, error: null, data: [] },
  testimonials: { loading: false, error: null, data: [] },
  recipes: { loading: false, error: null, data: {} as HomeMenu },
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
  on(loadMealsShippedFailure, (state, { error }) => ({
    ...state,
    mealsShipped: {
      ...state.mealsShipped,
      data: null,
      loading: false,
      error,
    },
  })),
  on(loadTestimonials, (state) => ({
    ...state,
    testimonials: {
      ...state.testimonials,
      loading: true,
    },
  })),
  on(loadTestimonialsSuccess, (state, { data }) => ({
    ...state,
    testimonials: {
      data,
      loading: false,
      error: null,
    },
  })),
  on(loadTestimonialsFailure, (state, { error }) => ({
    ...state,
    testimonials: {
      ...state.testimonials,
      data: null,
      loading: false,
      error,
    },
  })),
  on(loadHomeMenuRecipes, (state) => ({
    ...state,
    recipes: { ...state.recipes, loading: true, error: null },
  })),
  on(loadHomeMenuRecipesSuccess, (state, { data }) => ({
    ...state,
    recipes: {
      data,
      error: null,
      loading: false,
    },
  })),
  on(loadHomeMenuRecipesFailure, (state, { error }) => ({
    ...state,
    recipes: {
      data: null,
      error,
      loading: false,
    },
  }))
);
