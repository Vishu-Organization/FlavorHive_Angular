import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMenuComponent } from './home-menu.component';
import { Store } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HomeMenuComponent', () => {
  let component: HomeMenuComponent;
  let fixture: ComponentFixture<HomeMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeMenuComponent, HttpClientTestingModule],
      providers: [
        {
          provide: Store,
          useValue: jasmine.createSpyObj('Store', ['select', 'dispatch']),
        },
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
