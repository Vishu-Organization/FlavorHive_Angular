import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeTestimonialsComponent } from './home-testimonials.component';
import { Store } from '@ngrx/store';
import { HomeService } from 'src/services/home/home.service';
import { of } from 'rxjs';

describe('HomeTestimonialsComponent', () => {
  let component: HomeTestimonialsComponent;
  let fixture: ComponentFixture<HomeTestimonialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeTestimonialsComponent, HttpClientTestingModule],
      providers: [
        {
          provide: Store,
          useValue: jasmine.createSpyObj('Store', ['select', 'dispatch']),
        },
        {
          provide: HomeService,
          useValue: {
            testimonialsData$: of([]),
            testimonialsLoading$: of(false),
            testimonialsError$: of(null),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeTestimonialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
