import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { MenuHeaderFilters } from "./_types";

export const OnTheMenuFilterActions = createActionGroup({
  source: 'On The Menu Filter',
  events: {
    Load: emptyProps(),
    'Load Success': props<{ data: MenuHeaderFilters }>(),
    'Load Failure': props<{ error: string }>(),
  },
});