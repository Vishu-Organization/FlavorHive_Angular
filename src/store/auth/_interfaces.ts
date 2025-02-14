export interface ILoginPayload {
  email: string;
  password: string;
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
