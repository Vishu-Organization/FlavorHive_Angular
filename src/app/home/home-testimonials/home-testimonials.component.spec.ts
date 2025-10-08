import {
  ComponentFixture,
  TestBed,
  discardPeriodicTasks,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HomeTestimonialsComponent } from './home-testimonials.component';
import { Store } from '@ngrx/store';
import { HomeService } from 'src/services/home/home.service';
import { of, Subject } from 'rxjs';
import { Testimonial } from 'src/store/home/_interfaces';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('HomeTestimonialsComponent', () => {
  let component: HomeTestimonialsComponent;
  let fixture: ComponentFixture<HomeTestimonialsComponent>;
  let homeServiceMock: any;
  let storeMock: any;
  let testimonialsSubject: Subject<Testimonial[]>;

  beforeEach(async () => {
    testimonialsSubject = new Subject<Testimonial[]>();

    storeMock = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    homeServiceMock = {
      testimonialsData$: testimonialsSubject.asObservable(),
      testimonialsLoading$: of(false),
      testimonialsError$: of(null),
    };

    await TestBed.configureTestingModule({
    imports: [HomeTestimonialsComponent],
    providers: [
        { provide: Store, useValue: storeMock },
        { provide: HomeService, useValue: homeServiceMock },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
    ]
}).compileComponents();

    fixture = TestBed.createComponent(HomeTestimonialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Testimonials Subscription', () => {
    it('should not start interval when testimonials is empty', fakeAsync(() => {
      testimonialsSubject.next([]);
      tick(6000);
      expect(component.currentIndex).toBe(0);
    }));

    it('should start interval when testimonials are loaded', fakeAsync(() => {
      const mockTestimonials: Testimonial[] = [
        { id: 1, name: 'John', description: 'Great!' },
        { id: 2, name: 'Jane', description: 'Nice!' },
      ];
      testimonialsSubject.next(mockTestimonials);

      expect(component.intervalId).not.toBeNull();

      tick(5000);
      expect(component.currentIndex).toBe(1);

      tick(5000);
      expect(component.currentIndex).toBe(0); // loops back
      discardPeriodicTasks();
    }));
  });

  describe('Lifecycle Hooks', () => {
    it('should clear interval and unsubscribe on destroy', fakeAsync(() => {
      const mockTestimonials: Testimonial[] = [
        { id: 1, name: 'John', description: 'Great!' },
      ];
      testimonialsSubject.next(mockTestimonials);

      spyOn(component.subs, 'unsubscribe').and.callThrough();
      spyOn(window, 'clearInterval').and.callThrough();

      component.ngOnDestroy();

      expect(component.subs.unsubscribe).toHaveBeenCalled();
      expect(window.clearInterval).toHaveBeenCalledWith(component.intervalId);
    }));
  });

  describe('Observables', () => {
    it('should expose loading and error observables', (done) => {
      component.testimonialsLoading$.subscribe((loading) => {
        expect(loading).toBeFalse();
      });

      component.testimonialsError$.subscribe((error) => {
        expect(error).toBeNull();
        done();
      });
    });
  });
});
