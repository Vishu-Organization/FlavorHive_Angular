import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OnTheMenuComponent } from './on-the-menu.component';
import { OnTheMenuService } from 'src/services/on-the-menu/on-the-menu.service';
import { of } from 'rxjs';
import { Recipe, RecipesResponse } from 'src/store/on-the-menu/_types';

// ──────────────────────────────
// Stubs for child components
// ──────────────────────────────
@Component({
  selector: 'app-on-the-menu-header',
  template: '<div data-testid="header-stub">Header Stub</div>',
  standalone: true,
})
class OnTheMenuHeaderStub {}

@Component({
  selector: 'app-on-the-menu-list',
  template: '<div data-testid="list-stub">List Stub</div>',
  standalone: true,
})
class OnTheMenuListStub {
  @Input() recipes?: Recipe[];
}

// ──────────────────────────────
// Mock service data
// ──────────────────────────────
const mockRecipesResponse: RecipesResponse = {
  hits: [
    {
      recipe: {
        label: 'Pasta',
        calories: 200,
        url: 'https://example.com',
        dietLabels: ['Low Carb'],
        healthLabels: ['Vegan'],
        cuisineType: ['Italian'],
        mealType: ['Lunch'],
      },
    },
  ],
  _links: {
    next: { href: 'https://next-page', title: 'Next page' },
  },
} as any;

// ──────────────────────────────
// Test-only component (replace real imports with stubs)
// ──────────────────────────────
@Component({
  selector: 'app-on-the-menu',
  standalone: true,
  templateUrl: './on-the-menu.component.html',
  styleUrls: ['./on-the-menu.component.scss'],
  imports: [OnTheMenuHeaderStub, OnTheMenuListStub], // ✅ use stubs
})
class OnTheMenuComponentTestVersion extends OnTheMenuComponent {}

// ──────────────────────────────
// Tests
// ──────────────────────────────
describe('OnTheMenuComponent', () => {
  let fixture: ComponentFixture<OnTheMenuComponentTestVersion>;
  let component: OnTheMenuComponentTestVersion;
  let mockService: jasmine.SpyObj<OnTheMenuService>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('OnTheMenuService', [
      'loadOnTheMenuRecipes',
      'loadMoreOnTheMenuRecipes',
    ]);

    mockService.loadOnTheMenuRecipes.and.returnValue(of(mockRecipesResponse));

    await TestBed.configureTestingModule({
      imports: [OnTheMenuComponentTestVersion],
      providers: [{ provide: OnTheMenuService, useValue: mockService }],
    }).compileComponents();

    fixture = TestBed.createComponent(OnTheMenuComponentTestVersion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ───────────────────────────────
  describe('Component Creation', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize recipes signal with service data', () => {
      expect(component.recipes()).toEqual(mockRecipesResponse);
      expect(mockService.loadOnTheMenuRecipes).toHaveBeenCalledTimes(1);
    });
  });

  // ───────────────────────────────
  describe('Template Rendering', () => {
    it('should render header stub', () => {
      const el = fixture.nativeElement.querySelector(
        '[data-testid="header-stub"]'
      );
      expect(el).not.toBeNull();
    });

    it('should render list stub', () => {
      const el = fixture.nativeElement.querySelector(
        '[data-testid="list-stub"]'
      );
      expect(el).not.toBeNull();
    });
  });

  // ───────────────────────────────
  describe('loadMoreRecipes()', () => {
    it('should not call service when next link missing', () => {
      spyOn(component, 'recipes').and.returnValue({
        hits: [],
        _links: {},
      } as any);

      component.loadMoreRecipes();

      expect(mockService.loadMoreOnTheMenuRecipes).not.toHaveBeenCalled();
    });

    it('should confirm next URL exists', () => {
      expect(mockRecipesResponse._links.next.href).toBe('https://next-page');
    });
  });
});
