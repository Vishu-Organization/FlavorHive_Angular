import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { setTitle } from 'src/store/actions/dummy.actions';
import { initialize } from 'src/store/auth/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private store: Store) {
    this.store.dispatch(initialize());
  }

  changeTitle() {
    this.store.dispatch(setTitle({ title: 'New FlavorHive' }));
  }
}
