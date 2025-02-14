import { createReducer, on } from '@ngrx/store';
import {
  loadSignupData,
  loadSignupDataFailure,
  loadSignupDataSuccess,
  login,
  loginFailure,
  loginSuccess,
  logout,
  logoutFailure,
  logoutSuccess,
} from './actions';
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
  on(login, (state) => ({ ...state, loading: true, error: null })),
  on(loginSuccess, (state, { token }) => ({
    ...state,
    token,
    loading: false,
  })),
  on(loginFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(logout, (state) => ({ ...state, loading: true, error: null })),
  on(logoutSuccess, () => initialState),
  on(logoutFailure, (state, { error }) => ({ ...state, error, loading: false }))
);

export const signupDataReducer = createReducer(
  initialSignupDataState,
  on(loadSignupData, (state) => ({ ...state, loading: true, error: null })),
  on(loadSignupDataSuccess, (state, data) => ({
    ...state,
    data,
    loading: false,
  })),
  on(loadSignupDataFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
