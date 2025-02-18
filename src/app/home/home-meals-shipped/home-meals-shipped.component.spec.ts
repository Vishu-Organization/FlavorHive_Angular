import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMealsShippedComponent } from './home-meals-shipped.component';

describe('HomeMealsShippedComponent', () => {
  let component: HomeMealsShippedComponent;
  let fixture: ComponentFixture<HomeMealsShippedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeMealsShippedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeMealsShippedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
