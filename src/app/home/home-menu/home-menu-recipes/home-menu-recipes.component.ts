import { Component } from '@angular/core';
import { Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HomeService } from 'src/services/home/home.service';
import { HomeMenu, RecipeImages } from 'src/store/home/_interfaces';
import { HomeMenuActions } from 'src/store/home/actions';
import { HomeState } from 'src/store/home/reducer';

@Component({
  selector: 'app-home-menu-recipes',
  templateUrl: './home-menu-recipes.component.html',
  styleUrls: ['./home-menu-recipes.component.scss'],
})
export class HomeMenuRecipesComponent {
  homeMenuRecipes$: Observable<HomeMenu | null>;
  homeMenuRecipesLoading$: Observable<boolean>;
  homeMenuRecipesError$: Observable<string | null>;

  constructor(
    private store: Store<HomeState>,
    private homeService: HomeService
  ) {
    // this.store.dispatch(HomeMenuActions.load());
    this.homeMenuRecipes$ = this.homeService.homeReciepesData$;
    this.homeMenuRecipesLoading$ = this.homeService.homeReciepesLoading$;
    this.homeMenuRecipesError$ = this.homeService.homeReciepesError$;
  }

  generateSrcSet(images: RecipeImages | undefined): string {
    if (!images) {
      return '';
    }

    return `${images.SMALL.url} 640w, ${images.REGULAR.url} 1024w, ${
      images.LARGE?.url ?? images.REGULAR.url
    } 1280w`;
  }

  trackByKey(index: number, item: { key: string }): string {
    return item.key;
  }

  generateQueryParam(selector: string, value: string): Params {
    return { [selector]: value };
  }
}
