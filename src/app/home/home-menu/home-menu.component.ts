import { Component } from '@angular/core';
import { HomeMenuRecipesComponent } from './home-menu-recipes/home-menu-recipes.component';

@Component({
  standalone: true,
  selector: 'app-home-menu',
  templateUrl: './home-menu.component.html',
  styleUrls: ['./home-menu.component.scss'],
  imports: [HomeMenuRecipesComponent],
})
export class HomeMenuComponent {}
