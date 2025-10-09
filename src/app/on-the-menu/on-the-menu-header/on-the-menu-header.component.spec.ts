import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnTheMenuHeaderComponent } from './on-the-menu-header.component';

describe('OnTheMenuHeaderComponent', () => {
  let component: OnTheMenuHeaderComponent;
  let fixture: ComponentFixture<OnTheMenuHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnTheMenuHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnTheMenuHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
