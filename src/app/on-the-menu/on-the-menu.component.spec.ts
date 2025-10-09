import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnTheMenuComponent } from './on-the-menu.component';

describe('OnTheMenuComponent', () => {
  let component: OnTheMenuComponent;
  let fixture: ComponentFixture<OnTheMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnTheMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnTheMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
