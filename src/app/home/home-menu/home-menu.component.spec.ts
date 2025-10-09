import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMenuComponent } from './home-menu.component';
import { Store } from '@ngrx/store';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('HomeMenuComponent', () => {
  let component: HomeMenuComponent;
  let fixture: ComponentFixture<HomeMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeMenuComponent],
      providers: [
        {
          provide: Store,
          useValue: jasmine.createSpyObj('Store', ['select', 'dispatch']),
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
