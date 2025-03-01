import { authReducer, signupDataReducer } from '../auth/reducer';
import { footerReducer } from '../footer/reducer';
import { homeReducer } from '../home/reducer';
import { sharedReducer } from '../shared/reducer';

export const VITE_SUPABASE_URL = 'https://opmliiavikfniknrvlgt.supabase.co';

export const storeConfig = {
  auth: authReducer,
  signupData: signupDataReducer,
  home: homeReducer,
  footer: footerReducer,
  shared: sharedReducer,
};
