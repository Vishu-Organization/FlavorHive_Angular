import { createReducer, on } from "@ngrx/store";
import { FooterActions } from './actions';
import { FooterState } from './_interfaces';

const initialState: FooterState = {
  links: { data: [], error: null, loading: false },
};

export const footerReducer = createReducer(
  initialState,
  on(FooterActions.load, (state) => ({
    ...state,
    links: {
      ...state.links,
      loading: true,
    },
  })),
  on(FooterActions.loadSuccess, (state, { data }) => ({
    ...state,
    links: {
      ...state.links,
      data,
      loading: false,
    },
  })),
  on(FooterActions.loadFailure, (state, { error }) => ({
    ...state,
    links: {
      ...state.links,
      loading: false,
      error,
    },
  }))
);