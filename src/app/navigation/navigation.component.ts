import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, shareReplay } from 'rxjs';
import { logout } from 'src/store/auth/actions';
import { selectIsAuthenticated, selectUser } from 'src/store/auth/selectors';
import { IUser } from '../types/token';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  isAuthenticated$ = this.store.select(selectIsAuthenticated);
  user$: Observable<IUser | null | undefined> = this.store
    .select(selectUser)
    .pipe(shareReplay(1));

  constructor(private store: Store) {}

  onLogout() {
    this.store.dispatch(logout());
  }
}
