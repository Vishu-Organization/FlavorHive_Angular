import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setTitle } from 'src/store/actions/dummy.actions';
import { DummyState } from 'src/store/reducers/dummy.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title$: Observable<string> = this.store.select((state) => state.app.title);

  constructor(private store: Store<DummyState>) {}

  changeTitle() {
    this.store.dispatch(setTitle({ title: 'New FlavorHive' }));
  }
}
