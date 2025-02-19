import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMenuRecipesComponent } from './home-menu-recipes.component';

describe('HomeMenuRecipesComponent', () => {
  let component: HomeMenuRecipesComponent;
  let fixture: ComponentFixture<HomeMenuRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeMenuRecipesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeMenuRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
