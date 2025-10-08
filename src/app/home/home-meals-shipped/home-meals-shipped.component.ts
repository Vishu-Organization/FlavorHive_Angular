import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HomeService } from 'src/services/home/home.service';
import { MealsShipped } from 'src/store/home/_interfaces';
import { MealsShippedActions } from 'src/store/home/actions';
import { HomeState } from 'src/store/home/reducer';

@Component({
  standalone: true,
  selector: 'app-home-meals-shipped',
  templateUrl: './home-meals-shipped.component.html',
  styleUrls: ['./home-meals-shipped.component.scss'],
  imports: [NgIf, NgFor, AsyncPipe],
})
export class HomeMealsShippedComponent {
  mealsShippedData$: Observable<MealsShipped[] | null>;
  mealsShippedLoading$: Observable<boolean>;
  mealsShippedError$: Observable<string | null>;

  private homeService = inject(HomeService);
  private store = inject(Store<HomeState>);

  constructor() {
    this.store.dispatch(MealsShippedActions.load());
    this.mealsShippedData$ = this.homeService.mealsShippedData$;
    this.mealsShippedLoading$ = this.homeService.mealsShippedLoading$;
    this.mealsShippedError$ = this.homeService.mealsShippedError$;
  }

  trackById(index: number, item: { id: number }): number {
    return item.id;
  }
}
