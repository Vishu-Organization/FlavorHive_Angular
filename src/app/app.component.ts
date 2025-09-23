import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { initialize } from 'src/store/auth/actions';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [FooterComponent, NavigationComponent, RouterModule],
})
export class AppComponent {
  private store = inject(Store);

  constructor() {
    this.store.dispatch(initialize());
  }
}
