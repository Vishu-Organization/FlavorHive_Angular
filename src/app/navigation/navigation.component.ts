import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, shareReplay } from 'rxjs';
import { AuthActions } from 'src/store/auth/actions';
import { selectIsAuthenticated, selectUser } from 'src/store/auth/selectors';
import { IUser } from '../types/token';
import { AsyncPipe, CommonModule, NgClass, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  imports: [NgIf, NgClass, MatIconModule, AsyncPipe, RouterModule],
})
export class NavigationComponent {
  isAuthenticated$ = this.store.select(selectIsAuthenticated);
  user$: Observable<IUser | null | undefined> = this.store
    .select(selectUser)
    .pipe(shareReplay(1));

  constructor(private store: Store) {}

  onLogout() {
    this.store.dispatch(AuthActions.logout());
  }
}
