import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HomeMealsShippedComponent } from './home-meals-shipped.component';
import { Store } from '@ngrx/store';
import { MealsShippedActions } from 'src/store/home/actions';
import { of } from 'rxjs';
import { HomeService } from 'src/services/home/home.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('HomeMealsShippedComponent', () => {
  let component: HomeMealsShippedComponent;
  let fixture: ComponentFixture<HomeMealsShippedComponent>;
  let storeMock: jasmine.SpyObj<Store<any>>;

  beforeEach(async () => {
    storeMock = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    const homeServiceMock = {
      mealsShippedData$: of([]),
      mealsShippedLoading$: of(false),
      mealsShippedError$: of(null),
    };

    await TestBed.configureTestingModule({
    imports: [HomeMealsShippedComponent],
    providers: [
        { provide: Store, useValue: storeMock },
        { provide: HomeService, useValue: homeServiceMock },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
    ]
}).compileComponents();

    fixture = TestBed.createComponent(HomeMealsShippedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should dispatch MealsShippedActions.load on init', () => {
      expect(storeMock.dispatch).toHaveBeenCalledWith(
        MealsShippedActions.load()
      );
    });
  });

  describe('trackById()', () => {
    it('should return the id from the item', () => {
      const item = { id: 42 };
      expect(component.trackById(0, item)).toBe(42);
    });
  });

  describe('Observables', () => {
    it('should expose mealsShippedData$', () => {
      expect(component.mealsShippedData$).toBeDefined();
    });

    it('should expose mealsShippedLoading$', () => {
      expect(component.mealsShippedLoading$).toBeDefined();
    });

    it('should expose mealsShippedError$', () => {
      expect(component.mealsShippedError$).toBeDefined();
    });
  });
});
