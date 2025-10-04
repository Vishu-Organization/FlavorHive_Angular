import { AsyncPipe, CommonModule, KeyValuePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Params, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HomeService } from 'src/services/home/home.service';
import { HomeRecipe } from 'src/store/home/_interfaces';
import { HomeMenuActions } from 'src/store/home/actions';
import { HomeState } from 'src/store/home/reducer';

@Component({
  standalone: true,
  selector: 'app-home-menu-recipes',
  templateUrl: './home-menu-recipes.component.html',
  styleUrls: ['./home-menu-recipes.component.scss'],
  imports: [
    AsyncPipe,
    RouterModule,
    MatProgressSpinnerModule,
    KeyValuePipe,
    CommonModule,
  ],
})
export class HomeMenuRecipesComponent implements OnInit {
  homeMenuRecipes$: Observable<HomeRecipe | null>;
  homeMenuRecipesLoading$: Observable<boolean>;
  homeMenuRecipesError$: Observable<string | null>;
  skeletonArray = Array.from({ length: 10 }); // show 10 skeleton cards

  private store = inject(Store<HomeState>);
  private homeService = inject(HomeService);

  constructor() {
    this.homeMenuRecipes$ = this.homeService.homeReciepesData$;
    this.homeMenuRecipesLoading$ = this.homeService.homeReciepesLoading$;
    this.homeMenuRecipesError$ = this.homeService.homeReciepesError$;
  }

  ngOnInit(): void {
    this.store.dispatch(HomeMenuActions.load());
  }

  generateQueryParam(selector: string, value: string): Params {
    return { [selector]: value };
  }
}
