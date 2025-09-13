import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMenuRecipesComponent } from './home-menu-recipes.component';
import { Store } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HomeMenuRecipesComponent', () => {
  let component: HomeMenuRecipesComponent;
  let fixture: ComponentFixture<HomeMenuRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeMenuRecipesComponent, HttpClientTestingModule],
      providers: [
        {
          provide: Store,
          useValue: jasmine.createSpyObj('Store', ['select', 'dispatch']),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeMenuRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
