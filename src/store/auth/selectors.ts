import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AuthState, SignupDataState } from './_interfaces';

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

export const selectSignupHowItWorks = createSelector(
  selectSignupState,
  (signUpData) => signUpData?.howItWorks.data
);
export const selectSignupHowItWorksLoading = createSelector(
  selectSignupState,
  (signUpData) => signUpData?.howItWorks.loading
);
export const selectSignupHowItWorksError = createSelector(
  selectSignupState,
  (signUpData) => signUpData?.howItWorks.error
);
export const selectSignupAdditionalInfo = createSelector(
  selectSignupState,
  (signUpData) => signUpData?.additionalInfo.data
);
export const selectSignupAdditionalInfoLoading = createSelector(
  selectSignupState,
  (signUpData) => signUpData?.additionalInfo.loading
);
export const selectSignupAdditionalInfoError = createSelector(
  selectSignupState,
  (signUpData) => signUpData?.additionalInfo.error
);
