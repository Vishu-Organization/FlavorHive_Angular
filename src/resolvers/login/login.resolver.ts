import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { SignupDataState } from 'src/store/auth/_interfaces';
import { AuthDataActions } from 'src/store/auth/actions';

export const loginResolver: ResolveFn<void> = (route, state) => {
  const store = inject<Store<SignupDataState>>(Store);
  store.dispatch(AuthDataActions.load());
};
