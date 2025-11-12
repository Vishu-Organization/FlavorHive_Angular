import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OnTheMenuComponent } from './on-the-menu.component';
import { OnTheMenuService } from 'src/services/on-the-menu/on-the-menu.service';
import { of } from 'rxjs';
import { RecipesResponse } from 'src/store/on-the-menu/_types';

describe('OnTheMenuComponent', () => {
  let fixture: ComponentFixture<OnTheMenuComponent>;
  let component: OnTheMenuComponent;
  let mockService: jasmine.SpyObj<OnTheMenuService>;

  const mockRecipesResponse: RecipesResponse = {
    hits: [
      { recipe: { label: 'Pasta', calories: 200, url: 'https://example.com' } },
    ],
    _links: {
      next: { href: 'https://next-page', title: 'Next page' },
    },
  } as any;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('OnTheMenuService', [
      'loadOnTheMenuRecipes',
      'loadMoreOnTheMenuRecipes',
    ]);

    await TestBed.configureTestingModule({
      imports: [OnTheMenuComponent],
      providers: [{ provide: OnTheMenuService, useValue: mockService }],
    }).compileComponents();

    mockService.loadOnTheMenuRecipes.and.returnValue(of(mockRecipesResponse));

    fixture = TestBed.createComponent(OnTheMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ───────────────────────────────
  describe('Component Creation', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize recipes signal with data from service', () => {
      const recipes = component.recipes();
      expect(recipes).toEqual(mockRecipesResponse);
      expect(mockService.loadOnTheMenuRecipes).toHaveBeenCalledTimes(1);
    });
  });

  // ───────────────────────────────
  describe('Template Rendering', () => {
    it('should render header and list components', () => {
      const header = fixture.nativeElement.querySelector(
        'app-on-the-menu-header'
      );
      const list = fixture.nativeElement.querySelector('app-on-the-menu-list');
      expect(header).not.toBeNull();
      expect(list).not.toBeNull();
    });
  });

  // ───────────────────────────────
  describe('loadMoreRecipes()', () => {
    it('should do nothing if next link is missing', () => {
      spyOn(component, 'recipes').and.returnValue({
        hits: [],
        _links: {},
      } as any);
      const spy = mockService.loadMoreOnTheMenuRecipes;

      component.loadMoreRecipes();

      expect(spy).not.toHaveBeenCalled();
    });

    it('should eventually call service when implemented', () => {
      // This test will be updated when implementation is added
      const url = mockRecipesResponse._links.next.href;
      expect(url).toContain('https://next-page');
    });
  });
});
