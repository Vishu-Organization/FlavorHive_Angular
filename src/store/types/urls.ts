import { routerReducer } from '@ngrx/router-store';
import { authReducer, signupDataReducer } from '../auth/reducer';
import { footerReducer } from '../footer/reducer';
import { homeReducer } from '../home/reducer';
import { sharedReducer } from '../shared/reducer';
import { onTheMenuFilterReducer } from '../on-the-menu/reducer';

export const VITE_SUPABASE_URL = 'https://opmliiavikfniknrvlgt.supabase.co';

export const defaultRequiredTimeFilter = {
  time: ['14-60'],
};

export const fields = [
  'label',
  'image',
  'images',
  'source',
  'url',
  'healthLabels',
  'ingredientLines',
  'calories',
  'totalTime',
  'dietLabels',
];

export const reducers = {
  auth: authReducer,
  signupData: signupDataReducer,
  home: homeReducer,
  footer: footerReducer,
  shared: sharedReducer,
  router: routerReducer,
  onTheMenuFilter: onTheMenuFilterReducer,
};
