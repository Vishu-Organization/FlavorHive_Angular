import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FooterState } from "./_interfaces";

export const selectFooterState = createFeatureSelector<FooterState>('footer');
export const selectFooterLinks = createSelector(selectFooterState, (state) => state.links);
export const selectFooterLinksData = createSelector(selectFooterLinks, (state) => state.data);
export const selectFooterLinksLoading = createSelector(selectFooterLinks, (state) => state.loading);
export const selectFooterLinksError = createSelector(selectFooterLinks, (state) => state.error);