import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  signal,
  ViewChild,
  computed,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import {
  initialFilters,
  MenuHeaderFilters,
  OnTheMenuFilterOptionType,
} from 'src/store/on-the-menu/_types';
import { OnTheMenuFilterActions } from 'src/store/on-the-menu/actions';
import {
  selectFilterData,
  selectFilterError,
  selectFilterLoading,
} from 'src/store/on-the-menu/selectors';

@Component({
  selector: 'app-on-the-menu-header-filter',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './on-the-menu-header-filter.component.html',
  styleUrl: './on-the-menu-header-filter.component.scss',
  animations: [
    trigger('slideFadeDirection', [
      transition(':increment', [
        style({ opacity: 0, transform: 'translateX(50px)' }),
        animate(
          '500ms cubic-bezier(0.25, 1, 0.5, 1)',
          style({ opacity: 1, transform: 'translateX(0)' })
        ),
      ]),
      transition(':decrement', [
        style({ opacity: 0, transform: 'translateX(-50px)' }),
        animate(
          '300ms cubic-bezier(0.25, 1, 0.5, 1)',
          style({ opacity: 1, transform: 'translateX(0)' })
        ),
      ]),
    ]),
  ],
})
export class OnTheMenuHeaderFilterComponent {
  filtersData: MenuHeaderFilters = {} as MenuHeaderFilters;

  filters = signal<Record<OnTheMenuFilterOptionType, string[]>>(
    this.loadFiltersFromStorage()
  );

  filterKeys = Object.keys(initialFilters) as OnTheMenuFilterOptionType[];
  selectedFilterType = signal<OnTheMenuFilterOptionType>('cuisine');

  // Track selected filter index for animation direction
  selectedIndex = computed(() =>
    this.filterKeys.indexOf(this.selectedFilterType())
  );

  private store = inject(Store);

  filtersData$: Observable<MenuHeaderFilters | null> =
    this.store.select(selectFilterData);
  loading$ = this.store.select(selectFilterLoading);
  error$ = this.store.select(selectFilterError);

  constructor() {
    this.store
      .select(selectFilterData)
      .pipe(take(1)) // take(1) completes the observable after first emission.
      .subscribe((data) => {
        if (!data) {
          this.store.dispatch(OnTheMenuFilterActions.load());
        }
      });
  }

  @ViewChild('dialogRef') dialogRef!: ElementRef<HTMLDivElement>;

  handleFilterTypeSelect(type: string) {
    this.selectedFilterType.set(type as OnTheMenuFilterOptionType);
  }

  loadFiltersFromStorage(): Record<OnTheMenuFilterOptionType, string[]> {
    const saved = localStorage.getItem('filters');
    if (saved) {
      try {
        return JSON.parse(saved) as Record<OnTheMenuFilterOptionType, string[]>;
      } catch {
        console.warn('Invalid filters in localStorage, resetting.');
      }
    }
    return initialFilters;
  }

  handleOptionChange(option: string) {
    const selectedType = this.selectedFilterType();
    if (!selectedType) return;

    this.filters.update((prev) => {
      const currentOptions = prev[selectedType] || [];
      const updatedOptions = currentOptions.includes(option)
        ? currentOptions.filter((o) => o !== option)
        : [...currentOptions, option];

      return {
        ...prev,
        [selectedType]: updatedOptions,
      };
    });
  }

  handleClearAll() {
    this.filters.set(initialFilters);
  }

  handleClear() {
    const selectedFilterType = this.selectedFilterType();
    if (!selectedFilterType) return;

    this.filters.update((prev) => ({
      ...prev,
      [selectedFilterType]: [],
    }));
  }

  handleDone() {
    localStorage.setItem('filters', JSON.stringify(this.filters()));
  }

  get totalFilters(): number {
    const currentFilters = this.filters();
    return Object.values(currentFilters || {}).reduce(
      (sum, arr) => sum + arr.length,
      0
    );
  }

  isChecked(filterType: OnTheMenuFilterOptionType, value: string): boolean {
    const filters = this.filters();
    return filters[filterType]?.includes(value) ?? false;
  }
}
