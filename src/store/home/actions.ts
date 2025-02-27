import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { HomeMenu, MealsShipped, Testimonial } from './_interfaces';

export const MealsShippedActions = createActionGroup({
  source: 'Meals Shipped',
  events: {
    Load: emptyProps(),
    'Load Success': props<{ data: MealsShipped[] }>(),
    'Load Failure': props<{ error: string }>(),
  },
});

export const TestimonialsActions = createActionGroup({
  source: 'Testimonials',
  events: {
    Load: emptyProps(),
    'Load Success': props<{ data: Testimonial[] }>(),
    'Load Failure': props<{ error: string }>(),
  },
});

export const HomeMenuActions = createActionGroup({
  source: 'Home Menu',
  events: {
    Load: emptyProps(),
    'Load Success': props<{ data: HomeMenu }>(),
    'Load Failure': props<{ error: string }>(),
  },
});
