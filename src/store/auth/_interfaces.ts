import { IToken } from 'src/app/types/token';
import { Loader } from '../home/_interfaces';

export interface AuthState {
  token: IToken | null;
  error: string | null;
  loading: boolean;
}

export interface SignupDataState {
  howItWorks: ISignupDataItemState;
  additionalInfo: ISignupDataItemState;
}

export interface IAuthPayload {
  email: string;
  password: string;
}
export interface ISignupPayload extends IAuthPayload {
  name: string;
}

export interface ISignupDataItem {
  id: number;
  name: string;
  description: string;
}

export interface ISignupDataItemState extends Loader {
  data: ISignupDataItem[] | null;
}

export interface ISignupData {
  howItWorks: ISignupDataItem[];
  additionalInfo: ISignupDataItem[];
}
