import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {
  CanDeactivateGuard,
  CanComponentDeactivate,
} from './can-signup-deactivate.guard';
import { Observable, of } from 'rxjs';

describe('CanDeactivateGuard', () => {
  let guard: CanDeactivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanDeactivateGuard],
    });
    guard = TestBed.inject(CanDeactivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should call canDeactivate on the component if it exists', () => {
    const component: CanComponentDeactivate = {
      canDeactivate: jasmine.createSpy().and.returnValue(true),
    };
    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;
    const nextState = {} as RouterStateSnapshot;

    const result = guard.canDeactivate(component, route, state, nextState);
    expect(component.canDeactivate).toHaveBeenCalled();
    expect(result).toBe(true);
  });

  it('should return true if canDeactivate is not defined', () => {
    const component = {} as CanComponentDeactivate;
    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;
    const nextState = {} as RouterStateSnapshot;

    const result = guard.canDeactivate(component, route, state, nextState);
    expect(result).toBe(true);
  });

  it('should handle observable returned by canDeactivate', (done) => {
    const component: CanComponentDeactivate = {
      canDeactivate: () => of(true),
    };
    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;
    const nextState = {} as RouterStateSnapshot;

    const result = guard.canDeactivate(component, route, state, nextState);
    if (result instanceof Observable) {
      result.subscribe((value) => {
        expect(value).toBe(true);
        done();
      });
    } else {
      fail('Expected an Observable');
      done();
    }
  });
});
