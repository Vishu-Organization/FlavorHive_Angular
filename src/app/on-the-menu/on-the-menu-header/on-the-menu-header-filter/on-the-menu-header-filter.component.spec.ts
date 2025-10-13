import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnTheMenuHeaderFilterComponent } from './on-the-menu-header-filter.component';

describe('OnTheMenuHeaderFilterComponent', () => {
  let component: OnTheMenuHeaderFilterComponent;
  let fixture: ComponentFixture<OnTheMenuHeaderFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnTheMenuHeaderFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnTheMenuHeaderFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
