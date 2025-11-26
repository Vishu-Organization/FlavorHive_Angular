import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { RecipeHit } from 'src/store/on-the-menu/_types';
import { MenuRecipeCardComponent } from '../menu-recipe-card/menu-recipe-card.component';

@Component({
  selector: 'app-on-the-menu-list',
  standalone: true,
  imports: [MenuRecipeCardComponent],
  templateUrl: './on-the-menu-list.component.html',
  styleUrl: './on-the-menu-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnTheMenuListComponent {
  recipes = input<RecipeHit[] | undefined>([]);

  loadMore = output();
}
