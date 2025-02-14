import { createAction, props } from '@ngrx/store';
import { ILoginPayload, ISignupData } from './_interfaces';
import { IToken } from 'src/app/types/token';

export const ActionTypes = {
  Initialize: '[Auth] Initialize',
  Login: '[Auth] Login',
  LoginSuccess: '[Auth] Login Success',
  LoginFailure: '[Auth] Login Failure',
  Logout: '[Auth] Logout',
  LogoutSuccess: '[Auth] Logout Success',
  LogoutFailure: '[Auth] Logout Failure',
  LoadSignupData: '[Signup] Data Load',
  LoadSignupDataSuccess: '[Signup] Data Load Success',
  LoadSignupDataFailure: '[Signup] Data Load Failure',
};

export type AuthActionType =
  | '[Auth] Initialize'
  | '[Auth] Login'
  | '[Auth] Login Success'
  | '[Auth] Login Failure'
  | '[Auth] Logout'
  | '[Auth] Logout Success'
  | '[Auth] Logout Failure';

export const initialize = createAction(ActionTypes.Initialize);

export const login = createAction(ActionTypes.Login, props<ILoginPayload>());
export const loginSuccess = createAction(
  ActionTypes.LoginSuccess,
  props<{ token: IToken }>()
);
export const loginFailure = createAction(
  ActionTypes.LoginFailure,
  props<{ error: string }>()
);

export const logout = createAction(ActionTypes.Logout);
export const logoutSuccess = createAction(ActionTypes.LogoutSuccess);
export const logoutFailure = createAction(
  ActionTypes.LogoutFailure,
  props<{ error: string }>()
);

export const loadSignupData = createAction(ActionTypes.LoadSignupData);
export const loadSignupDataSuccess = createAction(
  ActionTypes.LoadSignupDataSuccess,
  props<ISignupData>()
);
export const loadSignupDataFailure = createAction(
  ActionTypes.LoadSignupDataFailure,
  props<{ error: string }>()
);
