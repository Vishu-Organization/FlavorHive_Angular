import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RecipeHit } from 'src/store/on-the-menu/_types';

@Component({
  selector: 'app-on-the-menu-list',
  standalone: true,
  imports: [],
  templateUrl: './on-the-menu-list.component.html',
  styleUrl: './on-the-menu-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnTheMenuListComponent {
  recipes = input<RecipeHit[]>();

  loadMore = output();
}
