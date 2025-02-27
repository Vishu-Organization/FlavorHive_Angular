import { createReducer, on } from '@ngrx/store';
import { AuthActions, AuthDataActions } from './actions';
import { AuthState, SignupDataState } from './_interfaces';

export const initialState: AuthState = {
  token: null,
  error: null,
  loading: false,
};

const initialSignupDataState: SignupDataState = {
  howItWorks: { data: null, loading: false, error: null },
  additionalInfo: { data: null, loading: false, error: null },
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({ ...state, loading: true, error: null })),
  on(AuthActions.loginSuccess, (state, { token }) => ({
    ...state,
    token,
    loading: false,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(AuthActions.logout, (state) => ({ ...state, loading: true, error: null })),
  on(AuthActions.logoutSuccess, () => initialState),
  on(AuthActions.logoutFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(AuthActions.signup, (state) => ({ ...state, loading: true, error: null })),
  on(AuthActions.signupSuccess, (state, { token }) => ({
    ...state,
    token,
    loading: false,
  })),
  on(AuthActions.signupFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);

export const signupDataReducer = createReducer(
  initialSignupDataState,
  on(AuthDataActions.load, (state) => ({
    ...state,
    additionalInfo: { ...state.additionalInfo, loading: true },
    howItWorks: { ...state.howItWorks, loading: true },
  })),
  on(AuthDataActions.loadSuccess, (state, { additionalInfo, howItWorks }) => ({
    ...state,
    additionalInfo: { data: additionalInfo, loading: false, error: null },
    howItWorks: { data: howItWorks, loading: false, error: null },
  })),
  on(AuthDataActions.loadFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
