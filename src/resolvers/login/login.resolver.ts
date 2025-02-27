import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { SignupDataState } from 'src/store/auth/_interfaces';
import { AuthDataActions } from 'src/store/auth/actions';


@Injectable({
  providedIn: 'root',
})
export class LoginResolver implements Resolve<void> {
  constructor(private store: Store<SignupDataState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {
    this.store.dispatch(AuthDataActions.load());
  }
}
