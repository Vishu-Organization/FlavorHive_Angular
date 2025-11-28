import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { MathPipe } from 'src/pipes/math/math.pipe';
import { Recipe } from 'src/store/on-the-menu/_types';

@Component({
  selector: 'app-menu-recipe-card',
  standalone: true,
  imports: [NgClass, MathPipe],
  templateUrl: './menu-recipe-card.component.html',
  styleUrl: './menu-recipe-card.component.scss',
})
export class MenuRecipeCardComponent {
  recipe = input<Recipe>();
  label = '';
  timeIcon = { path: 'assets/on-the-menu/time-icon.svg', alt: 'time icon' };
  vegIcon = { path: 'assets/on-the-menu/vegetarian.svg', alt: 'veg icon' };

  getLabel(): string | void {
    if (!this.recipe()) {
      return;
    }

    const labelsForFiltering = [
      'Sugar-Conscious',
      'High-Protein',
      'Low-Fat',
      'Low-Carb',
    ];
    const labelSet = new Set([
      ...this.recipe()!.dietLabels,
      ...this.recipe()!.healthLabels,
    ]);
    const matchingLabels = labelsForFiltering.filter((label) =>
      labelSet.has(label)
    );
    return matchingLabels[Math.floor(Math.random() * matchingLabels.length)]
      .split('-')
      .join(' ');
  }

  isVegetarian(): boolean {
    return [
      ...(this.recipe()?.dietLabels || []),
      ...(this.recipe()?.healthLabels || []),
    ].some(
      (label: string) =>
        label.toLocaleLowerCase() === 'vegan' ||
        label.toLocaleLowerCase() === 'vegetarian'
    );
  }
}
