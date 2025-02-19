import { Loader } from '../home/_interfaces';

export interface FooterState {
  links: FooterLinkState;
}

export interface FooterLinkState extends Loader {
  data: FooterLinkItem[] | null;
}

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
}

export enum LinkType {
  Link = 1,
  Email,
  Phone,
}
