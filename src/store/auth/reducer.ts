import { createReducer, on } from '@ngrx/store';
import { AuthActions, AuthDataActions } from './actions';
import {
  AuthState,
  ISignupDataItem,
  ISignupDataItemState,
  signupDataAdapter,
  SignupDataState,
} from './_interfaces';

export const initialState: AuthState = {
  token: null,
  error: null,
  loading: false,
};

const initialSignUpDataItemState: ISignupDataItemState =
  signupDataAdapter.getInitialState({
    loading: false,
    error: null,
  });

const initialSignupDataState: SignupDataState = {
  howItWorks: initialSignUpDataItemState,
  additionalInfo: initialSignUpDataItemState,
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
    additionalInfo: signupDataAdapter.setAll(additionalInfo, {
      ...state.additionalInfo,
      loading: false,
      error: null,
    }),
    howItWorks: signupDataAdapter.setAll(howItWorks, {
      ...state.howItWorks,
      loading: false,
      error: null,
    }),
  })),
  on(AuthDataActions.loadFailure, (state, { error }) => ({
    ...state,
    additionalInfo: { ...state.additionalInfo, loading: false, error },
    howItWorks: { ...state.howItWorks, loading: false, error },
  }))
);
