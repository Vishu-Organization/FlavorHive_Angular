import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { AuthDataActions } from 'src/store/auth/actions';
import { loginResolver } from './login.resolver';

describe('loginResolver', () => {
  let storeSpy: jasmine.SpyObj<Store<any>>;

  beforeEach(() => {
    storeSpy = jasmine.createSpyObj('Store', ['dispatch']);
    TestBed.configureTestingModule({
      providers: [{ provide: Store, useValue: storeSpy }],
    });
  });

  it('should dispatch AuthDataActions.load()', () => {
    // Run the resolver in the Angular DI context
    TestBed.runInInjectionContext(() => {
      loginResolver({} as any, {} as any);
    });
    expect(storeSpy.dispatch).toHaveBeenCalledWith(AuthDataActions.load());
  });
});
