import { IToken } from 'src/app/types/token';
import { Loader } from '../home/_interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export type AuthState = {
  token: IToken | null;
  error: string | null;
  loading: boolean;
};

export type SignupDataState = {
  howItWorks: ISignupDataItemState;
  additionalInfo: ISignupDataItemState;
};

export type IAuthPayload = {
  email: string;
  password: string;
};
export type ISignupPayload = IAuthPayload & {
  name: string;
};

export type ISignupDataItem = {
  id: number;
  name: string;
  description: string;
};

export type ISignupDataItemState = EntityState<ISignupDataItem> & Loader;
export const signupDataAdapter: EntityAdapter<ISignupDataItem> =
  createEntityAdapter<ISignupDataItem>();
export type ISignupData = {
  howItWorks: ISignupDataItem[];
  additionalInfo: ISignupDataItem[];
};
