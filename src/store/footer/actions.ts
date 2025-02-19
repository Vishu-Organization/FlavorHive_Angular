import { createAction, props } from '@ngrx/store';
import { FooterLinkItem } from './_interfaces';

const FooterActionTypes = {
  LoadFooterLinks: '[Footer] Load Links',
  LoadFooterLinksSuccess: '[Footer] Load Links Success',
  LoadFooterLinksFailure: '[Footer] Load Links Failure',
};

export const loadFooterLinks = createAction(FooterActionTypes.LoadFooterLinks);
export const loadFooterLinksSuccess = createAction(
    FooterActionTypes.LoadFooterLinksSuccess,
    props<{data: FooterLinkItem[]}>()
);
export const loadFooterLinksFailure = createAction(
    FooterActionTypes.LoadFooterLinksFailure,
    props<{error: string}>()
);
