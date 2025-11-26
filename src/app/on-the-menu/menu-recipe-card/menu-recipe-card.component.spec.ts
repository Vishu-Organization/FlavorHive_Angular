import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuRecipeCardComponent } from './menu-recipe-card.component';
import { Recipe } from 'src/store/on-the-menu/_types';

describe('MenuRecipeCardComponent', () => {
  let component: MenuRecipeCardComponent;
  let fixture: ComponentFixture<MenuRecipeCardComponent>;

  const mockRecipe: Recipe = {
    label: 'Chicken',
    dietLabels: ['High-Protein'],
    healthLabels: ['Low-Carb'],
    image: '',
    ingredientLines: [],
    calories: 100,
  } as unknown as Recipe;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuRecipeCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuRecipeCardComponent);
    component = fixture.componentInstance;
  });

  // ============================================================
  // getLabel()
  // ============================================================
  describe('getLabel()', () => {
    beforeEach(() => {
      // Make Math.random predictable
      spyOn(Math, 'random').and.returnValue(0); // Always select first match
    });

    it('should return a matching label from diet/health labels', () => {
      fixture.componentRef.setInput('recipe', mockRecipe);
      fixture.detectChanges();

      const result = component.getLabel();

      expect(result).toBe('High Protein'); // Hyphen removed
    });

    it('should return undefined when recipe is not provided', () => {
      fixture.componentRef.setInput('recipe', undefined);
      fixture.detectChanges();

      const result = component.getLabel();

      expect(result).toBeUndefined();
    });

    it('should return a string without hyphens', () => {
      fixture.componentRef.setInput('recipe', mockRecipe);
      fixture.detectChanges();

      const result = component.getLabel();

      expect(result).not.toContain('-');
    });
  });

  // ============================================================
  // isVegetarian()
  // ============================================================
  describe('isVegetarian()', () => {
    beforeEach(() => {
      // Prevent template from calling real getLabel()
      spyOn(component, 'getLabel').and.returnValue('Label');
    });

    it('should return true if dietLabels contain vegetarian', () => {
      fixture.componentRef.setInput('recipe', {
        ...mockRecipe,
        dietLabels: ['Vegetarian'],
        healthLabels: [],
      });
      fixture.detectChanges();

      expect(component.isVegetarian()).toBeTrue();
    });

    it('should return true if healthLabels contain vegan', () => {
      fixture.componentRef.setInput('recipe', {
        ...mockRecipe,
        dietLabels: [],
        healthLabels: ['Vegan'],
      });
      fixture.detectChanges();

      expect(component.isVegetarian()).toBeTrue();
    });

    it('should return false for non-vegetarian recipe', () => {
      fixture.componentRef.setInput('recipe', mockRecipe);
      fixture.detectChanges();

      expect(component.isVegetarian()).toBeFalse();
    });

    it('should return false when recipe is undefined', () => {
      fixture.componentRef.setInput('recipe', undefined);
      fixture.detectChanges();

      expect(component.isVegetarian()).toBeFalse();
    });
  });

});
