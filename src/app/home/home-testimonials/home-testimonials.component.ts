import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { HomeService } from 'src/services/home/home.service';
import { Testimonial } from 'src/store/home/_interfaces';
import { loadTestimonials } from 'src/store/home/actions';
import { HomeState } from 'src/store/home/reducer';

@Component({
  selector: 'app-home-testimonials',
  templateUrl: './home-testimonials.component.html',
  styleUrls: ['./home-testimonials.component.scss'],
})
export class HomeTestimonialsComponent implements OnDestroy {
  testimonials: Testimonial[] = [];
  testimonialsLoading$: Observable<boolean>;
  testimonialsError$: Observable<string | null>;
  subs = new Subscription();

  currentIndex = 0;
  intervalId: any = null;

  constructor(
    private homeService: HomeService,
    private store: Store<HomeState>
  ) {
    this.store.dispatch(loadTestimonials());
    this.subs.add(
      this.homeService.testimonialsData$.subscribe((testimonials) => {
        this.testimonials = testimonials || [];
        if (testimonials?.length && !this.intervalId) {
          this.intervalId = setInterval(() => {
            this.currentIndex =
              (this.currentIndex + 1) %
              (this.testimonials ? this.testimonials.length : 0);
          }, 5000);
        }
      })
    );
    this.testimonialsLoading$ = this.homeService.testimonialsLoading$;
    this.testimonialsError$ = this.homeService.testimonialsError$;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    clearInterval(this.intervalId);
  }
}
