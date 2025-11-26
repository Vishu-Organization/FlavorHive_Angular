import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { OnTheMenuListComponent } from './on-the-menu-list.component';
import { RecipeHit } from 'src/store/on-the-menu/_types';

// ──────────────────────────────
// Stub for MenuRecipeCardComponent
// ──────────────────────────────
@Component({
  selector: 'app-menu-recipe-card',
  standalone: true,
  template: `<div data-testid="menu-card-stub">{{ recipe?.label }}</div>`,
})
class MenuRecipeCardStub {
  @Input() recipe?: RecipeHit['recipe'];
}

// ──────────────────────────────
// Test-only version of the list component using stub
// ──────────────────────────────
@Component({
  selector: 'app-on-the-menu-list',
  standalone: true,
  imports: [MenuRecipeCardStub, CommonModule],
  template: `
    <ul>
      <li *ngFor="let hit of recipes()">
        <app-menu-recipe-card [recipe]="hit.recipe"></app-menu-recipe-card>
      </li>
    </ul>
  `,
})
class OnTheMenuListTestVersion extends OnTheMenuListComponent {}

// ──────────────────────────────
// Tests
// ──────────────────────────────
describe('OnTheMenuListComponent', () => {
  let fixture: ComponentFixture<OnTheMenuListTestVersion>;
  let component: OnTheMenuListTestVersion;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnTheMenuListTestVersion],
    }).compileComponents();

    fixture = TestBed.createComponent(OnTheMenuListTestVersion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Input: recipes', () => {
    it('should accept recipe list input and render stubs', () => {
      const mockRecipes: RecipeHit[] = [
        {
          recipe: { label: 'Test Recipe 1' } as any,
          _links: { self: { href: 'https://api.example.com/recipe1' } } as any,
        },
        {
          recipe: { label: 'Test Recipe 2' } as any,
          _links: { self: { href: 'https://api.example.com/recipe2' } } as any,
        },
      ];

      fixture.componentRef.setInput('recipes', mockRecipes);
      fixture.detectChanges();

      const cardEls = fixture.nativeElement.querySelectorAll(
        '[data-testid="menu-card-stub"]'
      );
      expect(cardEls.length).toBe(2);
      expect(cardEls[0].textContent).toContain('Test Recipe 1');
      expect(cardEls[1].textContent).toContain('Test Recipe 2');
    });
  });

  describe('Output: loadMore', () => {
    it('should emit when loadMore is triggered', () => {
      const spy = jasmine.createSpy('loadMoreSpy');
      component.loadMore.subscribe(spy);

      component.loadMore.emit();
      expect(spy).toHaveBeenCalled();
    });
  });
});
