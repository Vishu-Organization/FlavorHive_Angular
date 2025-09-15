import { of } from 'rxjs';
import { AuthGuard } from './auth.guard';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let storeSpy: jasmine.SpyObj<Store<any>>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    storeSpy = jasmine.createSpyObj('Store', ['select']);
    routerSpy = jasmine.createSpyObj('Router', ['createUrlTree']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Store, useValue: storeSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation when authenticated', (done) => {
    storeSpy.select.and.returnValue(of(true));

    guard.canActivate().subscribe((result: any) => {
      expect(result).toBeTrue();
      done();
    });
  });

  it('should redirect to login when not authenticated', (done) => {
    storeSpy.select.and.returnValue(of(false));
    routerSpy.createUrlTree.and.returnValue('/auth/login' as any);

    guard.canActivate().subscribe((result: any) => {
      expect(routerSpy.createUrlTree).toHaveBeenCalledWith(['auth/login']);
      expect(result).toBe('/auth/login' as any);
      done();
    });
  });
});
