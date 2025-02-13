import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./reducer";

export const selectAuthState = createFeatureSelector<AuthState>("auth");

const selectToken  = createSelector(selectAuthState, (state) => state.token);

export const selectAccessToken = createSelector(selectToken, (token) => token?.token);
export const selectUser = createSelector(selectToken, (token) => token?.user);
export const selectIsAuthenticated = createSelector(selectUser, (user) => !!user);
export const selectAuthLoading = createSelector(selectAuthState, (state) => state.loading);
