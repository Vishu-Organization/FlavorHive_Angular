import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HomeMenuRecipesComponent } from './home-menu-recipes.component';
import { HomeService } from 'src/services/home/home.service';
import { HomeMenuActions } from 'src/store/home/actions';
import { DummyRecipe, HomeRecipe } from 'src/store/home/_interfaces';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';

describe('HomeMenuRecipesComponent', () => {
  let component: HomeMenuRecipesComponent;
  let fixture: ComponentFixture<HomeMenuRecipesComponent>;
  let store: MockStore;
  let homeServiceSpy: Partial<HomeService>; // plain object with getters

  const initialState = {};

  const mockRecipe: HomeRecipe = {
    vegetarian: { name: 'Veggie Delight' } as DummyRecipe,
    mediterranean: { name: 'Mediterranean Salad' } as DummyRecipe,
    salad: { name: 'Caesar Salad' } as DummyRecipe,
    indian: { name: 'Butter Chicken' } as DummyRecipe,
    mexican: { name: 'Tacos' } as DummyRecipe,
    thai: { name: 'Pad Thai' } as DummyRecipe,
    breakfast: { name: 'Pancakes' } as DummyRecipe,
    snack: { name: 'Nachos' } as DummyRecipe,
    lunch: { name: 'Burger' } as DummyRecipe,
    dinner: { name: 'Spaghetti' } as DummyRecipe,
  };

  beforeEach(async () => {
    // Plain object with getters returning observables
    homeServiceSpy = {
      get homeReciepesData$() {
        return of(mockRecipe);
      },
      get homeReciepesLoading$() {
        return of(false);
      },
      get homeReciepesError$() {
        return of(null);
      },
    };

    await TestBed.configureTestingModule({
      imports: [HomeMenuRecipesComponent],
      providers: [
        provideRouter([]),
        provideMockStore({ initialState }),
        { provide: HomeService, useValue: homeServiceSpy },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(HomeMenuRecipesComponent);
    component = fixture.componentInstance;
  });

  describe('Initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should dispatch HomeMenuActions.load() on init', () => {
      const dispatchSpy = spyOn(store, 'dispatch');
      fixture.detectChanges();
      expect(dispatchSpy).toHaveBeenCalledWith(HomeMenuActions.load());
    });
  });

  describe('Service streams', () => {
    it('should expose observables from HomeService', (done) => {
      fixture.detectChanges();

      component.homeMenuRecipes$.subscribe((val) => {
        expect(val).toEqual(mockRecipe);
        done();
      });

      component.homeMenuRecipesLoading$.subscribe((val) => {
        expect(val).toBeFalse();
      });

      component.homeMenuRecipesError$.subscribe((val) => {
        expect(val).toBeNull();
      });
    });
  });

  describe('Helper methods', () => {
    it('should generate query params correctly', () => {
      const params = component.generateQueryParam('type', 'veg');
      expect(params).toEqual({ type: 'veg' });
    });

    it('should have skeleton array of length 10', () => {
      expect(component.skeletonArray.length).toBe(10);
    });
  });
});
