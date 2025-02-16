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

export interface ISignupData {
  howItWorks: ISignupDataItem[];
  additionalInfo: ISignupDataItem[];
}
