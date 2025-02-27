import { createFeatureSelector, createSelector } from '@ngrx/store';
import { footerLinkAdapter, FooterState } from './_interfaces';

export const selectFooterState = createFeatureSelector<FooterState>('footer');
export const selectFooterLinks = createSelector(
  selectFooterState,
  (state) => state.links
);
// export const selectFooterLinksData = createSelector(selectFooterLinks, (state) => state.data);
export const { selectAll: selectFooterLinksData } =
  footerLinkAdapter.getSelectors(selectFooterLinks);

export const selectFooterLinksLoading = createSelector(
  selectFooterLinks,
  (state) => state.loading
);
export const selectFooterLinksError = createSelector(
  selectFooterLinks,
  (state) => state.error
);
