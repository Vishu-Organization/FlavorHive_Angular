import { createFeatureSelector, createSelector } from "@ngrx/store";
import { HomeState } from "./reducer";

export const selectHomeState = createFeatureSelector<HomeState>('home');

export const selectMealsShipped = createSelector(selectHomeState, (state) => state.mealsShipped);
export const selectMealsShippedData = createSelector(selectMealsShipped, (state)=> state.data)
export const selectMealsShippedLoading = createSelector(selectMealsShipped, (state)=> state.loading)
export const selectMealsShippedError = createSelector(selectMealsShipped, (state)=> state.error)