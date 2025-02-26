import { createReducer, on } from '@ngrx/store';
import { AuthActions, AuthDataActions } from './actions';
import { IToken } from 'src/app/types/token';
import { ISignupData } from './_interfaces';

export interface AuthState {
  token: IToken | null;
  error: string | null;
  loading: boolean;
}

export interface SignupDataState {
  data: ISignupData | null;
  error: string | null;
  loading: boolean;
}

export const initialState: AuthState = {
  token: null,
  error: null,
  loading: false,
};

const initialSignupDataState: SignupDataState = {
  data: null,
  loading: false,
  error: null,
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
    loading: true,
    error: null,
  })),
  on(AuthDataActions.loadSuccess, (state, data) => ({
    ...state,
    data,
    loading: false,
  })),
  on(AuthDataActions.loadFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
