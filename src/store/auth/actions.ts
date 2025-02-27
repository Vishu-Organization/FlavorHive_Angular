import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { IAuthPayload, ISignupData, ISignupPayload } from './_interfaces';
import { IToken } from 'src/app/types/token';

export const ActionTypes = {
  Initialize: '[App] Initialize',
};

export const initialize = createAction(ActionTypes.Initialize);

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    Login: props<IAuthPayload>(),
    'Login Success': props<{ token: IToken }>(),
    'Login Failure': props<{ error: string }>(),
    Logout: emptyProps(),
    'Logout Success': emptyProps(),
    'Logout Failure': props<{ error: string }>(),
    Signup: props<ISignupPayload>(),
    'Signup Success': props<{ token: IToken }>(),
    'Signup Failure': props<{ error: string }>(),
  },
});

export const AuthDataActions = createActionGroup({
  source: 'Auth Data',
  events: {
    Load: emptyProps(),
    'Load Success': props<ISignupData>(),
    'Load Failure': props<{ error: string }>(),
  },
});
