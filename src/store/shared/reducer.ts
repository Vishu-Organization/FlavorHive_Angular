import { createReducer, on } from '@ngrx/store';
import { SharedState } from './_interfaces';
import {
  emailSignup,
  emailSignupFailure,
  emailSignupSuccess,
  loadBlog,
  loadBlogFailure,
  loadBlogSuccess,
} from './actions';

const initialState: SharedState = {
  blog: { data: null, loading: false, error: null },
  emailSignup: { data: null, loading: false, error: null },
};

export const sharedReducer = createReducer(
  initialState,
  on(loadBlog, (state) => ({
    ...state,
    blog: { ...state.blog, loading: true, error: null },
  })),
  on(loadBlogSuccess, (state, { data }) => ({
    ...state,
    blog: {
      loading: false,
      error: null,
      data,
    },
  })),
  on(loadBlogFailure, (state, { error }) => ({
    ...state,
    blog: { ...state.blog, loading: false, error },
  })),
  on(emailSignup, (state) => ({
    ...state,
    emailSignup: { loading: true, data:null, error: null },
  })),
  on(emailSignupSuccess, (state, { isAdded }) => ({
    ...state,
    emailSignup: { data: isAdded, loading: false, error: null },
  })),
  on(emailSignupFailure, (state, { error }) => ({
    ...state,
    emailSignup: { data: null, loading: false, error },
  }))
);
