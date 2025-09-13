import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationComponent } from './navigation.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthActions } from 'src/store/auth/actions';
import { IUser } from '../types/token';
import { selectIsAuthenticated, selectUser } from 'src/store/auth/selectors';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let storeSpy: jasmine.SpyObj<Store<any>>;

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj('Store', ['select', 'dispatch']);

    // Mock selectors based on the function reference
    storeSpy.select.and.callFake((selector: any) => {
      if (selector === selectIsAuthenticated) {
        return of(true);
      }
      if (selector === selectUser) {
        const mockUser: IUser = {
          id: '123',
          email: 'test@example.com',
        } as IUser;
        return of(mockUser);
      }
      return of(null);
    });

    await TestBed.configureTestingModule({
      imports: [NavigationComponent],
      providers: [
        { provide: Store, useValue: storeSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            queryParams: of({}),
            data: of({}),
            fragment: of(null),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Selectors', () => {
    it('should get authentication status from store', (done) => {
      component.isAuthenticated$.subscribe((value) => {
        expect(value).toBeTrue();
        done();
      });
    });

    it('should get user from store', (done) => {
      component.user$.subscribe((user) => {
        expect(user).toEqual({ id: '123', email: 'test@example.com' } as IUser);
        done();
      });
    });
  });

  describe('onLogout()', () => {
    it('should dispatch logout action', () => {
      component.onLogout();
      expect(storeSpy.dispatch).toHaveBeenCalledWith(AuthActions.logout());
    });
  });
});
