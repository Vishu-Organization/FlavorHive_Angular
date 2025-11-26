import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { OnTheMenuHeaderComponent } from './on-the-menu-header/on-the-menu-header.component';
import { OnTheMenuService } from 'src/services/on-the-menu/on-the-menu.service';
import { defaultRequiredTimeFilter, fields } from 'src/store/types/urls';
import { OnTheMenuListComponent } from './on-the-menu-list/on-the-menu-list.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-on-the-menu',
  standalone: true,
  imports: [OnTheMenuHeaderComponent, OnTheMenuListComponent],
  templateUrl: './on-the-menu.component.html',
  styleUrl: './on-the-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnTheMenuComponent {
  private onTheMenuService = inject(OnTheMenuService);
  private recipes$ = this.onTheMenuService.loadOnTheMenuRecipes({
    fields,
    ...defaultRequiredTimeFilter,
  });

  recipes = toSignal(
    this.recipes$.pipe(
      map((value) => ({
        ...value,
        hits: value.hits.map((hit) => ({
          ...hit,
          recipe: {
            ...hit.recipe,
            calories: Math.round(hit.recipe.calories),
          },
        })),
      }))
    )
  );

  loadMoreRecipes() {
    // TODO: Future implementation
    // const url = this.recipes()?._links.next.href;
  }
}
