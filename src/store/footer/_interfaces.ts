import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Loader } from '../home/_interfaces';

export interface FooterState {
  links: FooterLinkState;
}

// export interface FooterLinkState extends Loader {
//   links: FooterLinkItem[] | null;
// }

export interface FooterLinkState extends EntityState<FooterLinkItem>, Loader {}
export const footerLinkAdapter: EntityAdapter<FooterLinkItem> =
  createEntityAdapter<FooterLinkItem>();
export interface FooterLink {
  id: number;
  name: string;
  type: number;
  to: string;
  test_id: string;
}

export interface FooterLinkItem {
  links: FooterLink[];
  title: string;
  id: number;
}

export enum LinkType {
  Link = 1,
  Email,
  Phone,
}
