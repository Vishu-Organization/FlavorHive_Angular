import {
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { FooterLinkItem } from './_interfaces';

export const FooterActions = createActionGroup({
  source: 'Footer',
  events: {
    Load: emptyProps(),
    'Load Success': props<{ data: FooterLinkItem[] }>(),
    'Load Failure': props<{ error: string }>(),
  },
});
