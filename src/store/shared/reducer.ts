import { createReducer, on } from '@ngrx/store';
import { SharedState } from './_interfaces';
import { BlogActions, EmailSignupActions } from './actions';

const initialState: Readonly<SharedState> = {
  blog: { data: null, loading: false, error: null },
  emailSignup: { data: null, loading: false, error: null },
};

export const sharedReducer = createReducer(
  initialState,
  on(BlogActions.load, (state) => ({
    ...state,
    blog: { ...state.blog, loading: true, error: null },
  })),
  on(BlogActions.loadSuccess, (state, { data }) => ({
    ...state,
    blog: {
      loading: false,
      error: null,
      data,
    },
  })),
  on(BlogActions.loadFailure, (state, { error }) => ({
    ...state,
    blog: { ...state.blog, loading: false, error },
  })),
  on(EmailSignupActions.signup, (state) => ({
    ...state,
    emailSignup: { loading: true, data: null, error: null },
  })),
  on(EmailSignupActions.signupSuccess, (state, { isAdded }) => ({
    ...state,
    emailSignup: { data: isAdded, loading: false, error: null },
  })),
  on(EmailSignupActions.signupFailure, (state, { error }) => ({
    ...state,
    emailSignup: { data: null, loading: false, error },
  }))
);
