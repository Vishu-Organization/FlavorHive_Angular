import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRatingsComponent } from './home-ratings.component';

describe('HomeRatingsComponent', () => {
  let component: HomeRatingsComponent;
  let fixture: ComponentFixture<HomeRatingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeRatingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
