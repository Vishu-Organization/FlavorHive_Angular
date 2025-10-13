import { TestBed } from '@angular/core/testing';

import { OnTheMenuFilterService } from './on-the-menu-filter.service';

describe('OnTheMenuFilterService', () => {
  let service: OnTheMenuFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnTheMenuFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
