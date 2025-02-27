import { createReducer, on } from '@ngrx/store';
import {
  HomeMenu,
  HomeRecipesState,
  mealsShippedAdapter,
  MealsShippedState,
  testimonialsAdapter,
  TestimonialState,
} from './_interfaces';
import {
  HomeMenuActions, TestimonialsActions, MealsShippedActions,
} from './actions';

export interface HomeState {
  mealsShipped: MealsShippedState;
  testimonials: TestimonialState;
  recipes: HomeRecipesState;
}

const initialMealsShippedState: MealsShippedState =
  mealsShippedAdapter.getInitialState({
    loading: false,
    error: null,
  });

const initialTestimonialsState: TestimonialState =
  testimonialsAdapter.getInitialState({
    loading: false,
    error: null,
  });

const initialRecipesState: HomeRecipesState = {
  loading: false,
  error: null,
  data: null,
};

const initialState: HomeState = {
  mealsShipped: initialMealsShippedState,
  testimonials: initialTestimonialsState,
  recipes: initialRecipesState,
};

export const homeReducer = createReducer(
  initialState,
  on(MealsShippedActions.load, (state) => ({
    ...state,
    mealsShipped: {
      ...state.mealsShipped,
      loading: true,
      error: null,
    },
  })),
  on(MealsShippedActions.loadSuccess, (state, { data: meals }) => ({
    ...state,
    mealsShipped: mealsShippedAdapter.setAll(meals, {
      ...state.mealsShipped,
      loading: false,
      error: null,
    }),
  })),
  on(MealsShippedActions.loadFailure, (state, { error }) => ({
    ...state,
    mealsShipped: {
      ...state.mealsShipped,
      loading: false,
      error,
    },
  })),
  // testimonials reducers
  on(TestimonialsActions.load, (state) => ({
    ...state,
    testimonials: {
      ...state.testimonials,
      loading: true,
      error: null,
    },
  })),
  on(TestimonialsActions.loadSuccess, (state, { data }) => ({
    ...state,
    testimonials: testimonialsAdapter.setAll(data, {
      ...state.testimonials,
      loading: false,
      error: null,
    }),
  })),
  on(TestimonialsActions.loadFailure, (state, { error }) => ({
    ...state,
    testimonials: {
      ...state.testimonials,
      loading: false,
      error,
    },
  })),
  on(HomeMenuActions.load, (state) => ({
    ...state,
    recipes: { ...state.recipes, loading: true },
  })),
  on(HomeMenuActions.loadSuccess, (state, { data }) => ({
    ...state,
    recipes: {
      data,
      error: null,
      loading: false,
    },
  })),
  on(HomeMenuActions.loadFailure, (state, { error }) => ({
    ...state,
    recipes: {
      data: null,
      error,
      loading: false,
    },
  }))
);
