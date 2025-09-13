import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HomeMealsShippedComponent } from './home-meals-shipped.component';
import { Store } from '@ngrx/store';

describe('HomeMealsShippedComponent', () => {
  let component: HomeMealsShippedComponent;
  let fixture: ComponentFixture<HomeMealsShippedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeMealsShippedComponent, HttpClientTestingModule],
      providers: [
        {
          provide: Store,
          useValue: jasmine.createSpyObj('Store', ['select', 'dispatch']),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeMealsShippedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
