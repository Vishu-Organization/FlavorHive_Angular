import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, SignupDataState } from './reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

const selectToken = createSelector(selectAuthState, (state) => state.token);

export const selectAccessToken = createSelector(
  selectToken,
  (token) => token?.token
);
export const selectUser = createSelector(selectToken, (token) => token?.user);
export const selectIsAuthenticated = createSelector(
  selectUser,
  (user) => !!user
);
export const selectAuthLoading = createSelector(
  selectAuthState,
  (state) => state.loading
);

export const selectSignupState =
  createFeatureSelector<SignupDataState>('signupData');
export const selectSignupData = createSelector(
  selectSignupState,
  (state) => state.data
);
export const selectSignupDataLoading = createSelector(
  selectSignupState,
  (state) => state.loading
);
export const selectSignupDataError = createSelector(
  selectSignupState,
  (state) => state.error
);

export const selectSignupHowItWorks = createSelector(
  selectSignupData,
  (signUpData) => signUpData?.howItWorks
);
export const selectSignupAdditionalInfo = createSelector(
  selectSignupData,
  (signUpData) => signUpData?.additionalInfo
);
