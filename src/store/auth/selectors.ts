import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AuthState, signupDataAdapter, SignupDataState } from './_interfaces';

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

const selectSignupHowItWorks = createSelector(
  selectSignupState,
  ({ howItWorks }) => howItWorks
);

export const selectSignupHowItWorksLoading = createSelector(
  selectSignupHowItWorks,
  ({ loading }) => loading
);
export const selectSignupHowItWorksError = createSelector(
  selectSignupHowItWorks,
  ({ error }) => error
);

export const { selectAll: selectSignupHowItWorksData } =
  signupDataAdapter.getSelectors(selectSignupHowItWorks);

const selectSignupAdditionalInfo = createSelector(
  selectSignupState,
  ({ additionalInfo }) => additionalInfo
);

export const { selectAll: selectSignupAdditionalInfoData } =
  signupDataAdapter.getSelectors(selectSignupAdditionalInfo);

export const selectSignupAdditionalInfoLoading = createSelector(
  selectSignupAdditionalInfo,
  ({ loading }) => loading
);
export const selectSignupAdditionalInfoError = createSelector(
  selectSignupAdditionalInfo,
  ({ error }) => error
);
