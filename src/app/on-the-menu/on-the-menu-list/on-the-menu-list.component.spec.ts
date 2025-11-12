import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OnTheMenuListComponent } from './on-the-menu-list.component';
import { RecipeHit } from 'src/store/on-the-menu/_types';

describe('OnTheMenuListComponent', () => {
  let component: OnTheMenuListComponent;
  let fixture: ComponentFixture<OnTheMenuListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnTheMenuListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OnTheMenuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Input: recipes', () => {
    it('should accept recipe list input', () => {
      const mockRecipes: RecipeHit[] = [
        {
          recipe: { label: 'Test Recipe 1' } as any,
          _links: {
            self: { href: 'https://api.example.com/recipe1' },
          },
        } as RecipeHit,
        {
          recipe: { label: 'Test Recipe 2' } as any,
          _links: { self: { href: 'https://api.example.com/recipe2' } },
        } as RecipeHit,
      ];

      fixture.componentRef.setInput('recipes', mockRecipes);
      fixture.detectChanges();
      expect(component.recipes()).toEqual(mockRecipes);
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
