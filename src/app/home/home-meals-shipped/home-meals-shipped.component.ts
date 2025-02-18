import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HomeService } from 'src/services/home/home.service';
import { MealsShipped } from 'src/store/home/_interfaces';
import { loadMealsShipped } from 'src/store/home/actions';
import { HomeState } from 'src/store/home/reducer';

@Component({
  selector: 'app-home-meals-shipped',
  templateUrl: './home-meals-shipped.component.html',
  styleUrls: ['./home-meals-shipped.component.scss'],
})
export class HomeMealsShippedComponent {
  mealsShippedData$: Observable<MealsShipped[] | null>;
  mealsShippedLoading$: Observable<boolean>;
  mealsShippedError$: Observable<string | null>;

  constructor(
    private homeService: HomeService,
    private store: Store<HomeState>
  ) {
    this.store.dispatch(loadMealsShipped());
    this.mealsShippedData$ = this.homeService.mealsShippedData$;
    this.mealsShippedLoading$ = this.homeService.mealsShippedLoading$;
    this.mealsShippedError$ = this.homeService.mealsShippedError$;
  }

  trackById(index: number, item: { id: number }): number {
    return item.id;
  }
}
