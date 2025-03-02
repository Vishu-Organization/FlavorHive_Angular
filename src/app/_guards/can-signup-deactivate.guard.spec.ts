import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { canSignupDeactivateGuard } from './can-signup-deactivate.guard';

describe('canSignupDeactivateGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canSignupDeactivateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
