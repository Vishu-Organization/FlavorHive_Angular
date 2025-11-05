import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { OnTheMenuHeaderFilterComponent } from './on-the-menu-header-filter.component';
import { OnTheMenuFilterActions } from 'src/store/on-the-menu/actions';
import {
  initialFilters,
  MenuHeaderFilters,
} from 'src/store/on-the-menu/_types';
import { MemoizedSelector } from '@ngrx/store';
import {
  selectFilterData,
  selectFilterLoading,
  selectFilterError,
} from 'src/store/on-the-menu/selectors';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('OnTheMenuHeaderFilterComponent', () => {
  let component: OnTheMenuHeaderFilterComponent;
  let fixture: ComponentFixture<OnTheMenuHeaderFilterComponent>;
  let store: MockStore;
  let mockSelectFilterData: MemoizedSelector<any, MenuHeaderFilters | null>;
  let dispatchSpy: jasmine.Spy;

  const mockFiltersData: MenuHeaderFilters = {
    cuisine: [{ id: 1, value: 'Indian' }],
    diet: [{ id: 2, value: 'Vegan' }],
    dish: [{ id: 3, value: 'Salad' }],
    health: [{ id: 4, value: 'Low Fat' }],
    meal: [{ id: 5, value: 'Dinner' }],
    ingredients: [],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnTheMenuHeaderFilterComponent, NoopAnimationsModule],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectFilterData, value: null },
            { selector: selectFilterLoading, value: false },
            { selector: selectFilterError, value: null },
          ],
        }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, 'dispatch');
    mockSelectFilterData = store.overrideSelector(selectFilterData, null);

    fixture = TestBed.createComponent(OnTheMenuHeaderFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should dispatch load action when no filter data available', () => {
      expect(dispatchSpy).toHaveBeenCalledWith(OnTheMenuFilterActions.load());
    });

    it('should not dispatch load action if data exists', () => {
      dispatchSpy.calls.reset();
      mockSelectFilterData.setResult(mockFiltersData);
      store.refreshState();
      fixture.detectChanges();
      expect(dispatchSpy).not.toHaveBeenCalled();
    });
  });

  describe('Filter operations', () => {
    beforeEach(() => {
      component.filters.set(initialFilters);
      component.selectedFilterType.set('cuisine');
    });

    it('should toggle filter option on handleOptionChange', () => {
      component.handleOptionChange('Indian');
      let filters = component.filters();
      expect(filters.cuisine).toContain('Indian');

      component.handleOptionChange('Indian');
      filters = component.filters();
      expect(filters.cuisine).not.toContain('Indian');
    });

    it('should clear all filters', () => {
      component.filters.set({
        ...initialFilters,
        cuisine: ['Indian'],
      });
      component.handleClearAll();
      expect(component.filters()).toEqual(initialFilters);
    });

    it('should clear selected filter category', () => {
      component.filters.set({
        ...initialFilters,
        cuisine: ['Indian', 'Italian'],
      });
      component.handleClear();
      expect(component.filters().cuisine.length).toBe(0);
    });

    it('should save filters to localStorage on handleDone', () => {
      spyOn(localStorage, 'setItem');
      component.handleDone();
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'filters',
        jasmine.any(String)
      );
    });
  });

  describe('Computed properties', () => {
    it('should calculate total filters correctly', () => {
      component.filters.set({
        ...initialFilters,
        cuisine: ['Indian', 'Thai'],
        diet: ['Vegan'],
      });
      expect(component.totalFilters).toBe(3);
    });

    it('should return true if option is checked', () => {
      component.filters.set({
        ...initialFilters,
        cuisine: ['Indian'],
      });
      expect(component.isChecked('cuisine', 'Indian')).toBeTrue();
      expect(component.isChecked('cuisine', 'Italian')).toBeFalse();
    });
  });

  describe('Local storage behavior', () => {
    it('should load filters from localStorage if valid', () => {
      const stored = {
        cuisine: ['Indian'],
        diet: [],
        dish: [],
        health: [],
        meal: [],
        ingredients: [],
      };
      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(stored));
      const result = component.loadFiltersFromStorage();
      expect(result.cuisine).toEqual(['Indian']);
    });

    it('should return initial filters if localStorage invalid', () => {
      spyOn(localStorage, 'getItem').and.returnValue('invalid-json');
      const result = component.loadFiltersFromStorage();
      expect(result).toEqual(initialFilters);
    });
  });

  describe('Edge cases for branch coverage', () => {
    it('should not update filters if selectedFilterType is empty in handleOptionChange', () => {
      component.selectedFilterType.set('' as any);
      const prevFilters = component.filters();
      component.handleOptionChange('Indian');
      expect(component.filters()).toEqual(prevFilters);
    });

    it('should not update filters if selectedFilterType is empty in handleClear', () => {
      component.selectedFilterType.set('' as any);
      const prevFilters = component.filters();
      component.handleClear();
      expect(component.filters()).toEqual(prevFilters);
    });

    it('should handle exception when localStorage contains unparsable data', () => {
      spyOn(localStorage, 'getItem').and.returnValue('{invalid-json');
      const warnSpy = spyOn(console, 'warn');
      const result = component.loadFiltersFromStorage();
      expect(warnSpy).toHaveBeenCalledWith(
        'Invalid filters in localStorage, resetting.'
      );
      expect(result).toEqual(initialFilters);
    });
  });
});
