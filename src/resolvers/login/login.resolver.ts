import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { loadSignupData } from 'src/store/auth/actions';
import { SignupDataState } from 'src/store/auth/reducer';

@Injectable({
  providedIn: 'root',
})
export class LoginResolver implements Resolve<void> {
  constructor(private store: Store<SignupDataState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {
    this.store.dispatch(loadSignupData());
  }
}
