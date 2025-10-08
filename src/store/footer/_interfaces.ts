import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Loader } from '../home/_interfaces';

export type FooterState = {
  links: FooterLinkState;
}

export type FooterLinkState = {} & EntityState<FooterLinkItem> & Loader
export const footerLinkAdapter: EntityAdapter<FooterLinkItem> =
  createEntityAdapter<FooterLinkItem>();
export type FooterLink = {
  id: number;
  name: string;
  type: number;
  to: string;
  test_id: string;
}

export type FooterLinkItem = {
  links: FooterLink[];
  title: string;
  id: number;
}

export enum LinkType {
  Link = 1,
  Email,
  Phone,
}
