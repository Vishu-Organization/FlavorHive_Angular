import { createReducer, on } from '@ngrx/store';
import { FooterActions } from './actions';
import { footerLinkAdapter, FooterLinkState, FooterState } from './_interfaces';

// const initialState: FooterState = {
//   links: { links: [], error: null, loading: false },
// };

const initialFooterLinkState: FooterLinkState =
  footerLinkAdapter.getInitialState({
    loading: false,
    error: null,
  });

const initialState: FooterState = {
  links: initialFooterLinkState,
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
    links: footerLinkAdapter.setAll(data, {
      ...state.links,
      loading: false,
      error: null,
    }),
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
